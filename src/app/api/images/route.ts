// src/app/api/images/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { supabase } from '@/lib/supabase/client';
import { getAllImages } from '@/lib/images';
import { revalidatePath } from 'next/cache';

const UPLOADS_DIR = 'public/images/uploads';
const UPLOADS_URL_PATH = '/images/uploads';


// GET /api/images - Fetches all images from the manifest
export async function GET() {
    try {
        const images = await getAllImages();
        const formattedImages = images.map(img => ({
            id: img.image_id,
            path: img.image_url,
        }));
        return NextResponse.json({ images: formattedImages });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Failed to fetch images.' }, { status: 500 });
    }
}


// POST /api/images - Uploads a new image
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
        }

        const uploadsPath = path.join(process.cwd(), UPLOADS_DIR);
        await fs.mkdir(uploadsPath, { recursive: true });

        // Sanitize filename
        const filename = file.name.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase();
        const uniqueFilename = `${Date.now()}-${filename}`;
        const filePath = path.join(uploadsPath, uniqueFilename);
        const fileUrl = path.join(UPLOADS_URL_PATH, uniqueFilename).replace(/\\/g, '/');

        // Save the file
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        // Add to manifest
        const newImageEntry = {
            image_id: `upload-${path.parse(uniqueFilename).name}`,
            description: `User uploaded image: ${filename}`,
            image_url: fileUrl,
            image_hint: 'custom upload',
        };

        const { data, error } = await supabase
            .from('images')
            .insert(newImageEntry)
            .select()
            .single();

        if (error) throw error;
        
        revalidatePath('/'); // Revalidate cache for images
        
        return NextResponse.json({ success: true, image: data });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Image upload failed.' }, { status: 500 });
    }
}


// DELETE /api/images - Deletes an image
const deleteSchema = z.object({
    id: z.string(),
});
export async function DELETE(request: Request) {
     try {
        const body = await request.json();
        const validated = deleteSchema.safeParse(body);
        
        if (!validated.success) {
            return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
        }

        const { id } = validated.data;
        
        const { data: imageToDelete, error: selectError } = await supabase
            .from('images')
            .select('image_url')
            .eq('image_id', id)
            .single();
        
        if (selectError || !imageToDelete) {
            return NextResponse.json({ error: 'Image not found in database.' }, { status: 404 });
        }

        // Only attempt to delete file if it's in the uploads directory
        if (imageToDelete.image_url.startsWith(UPLOADS_URL_PATH)) {
            const filePath = path.join(process.cwd(), 'public', imageToDelete.image_url);
            try {
                await fs.unlink(filePath);
            } catch (error) {
                // Log error but don't fail the whole request if file is already gone
                console.warn(`Could not delete file ${filePath}:`, error);
            }
        }

        const { error: deleteError } = await supabase
            .from('images')
            .delete()
            .eq('image_id', id);

        if (deleteError) throw deleteError;

        revalidatePath('/'); // Revalidate cache for images
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Failed to delete image.' }, { status: 500 });
    }
}
