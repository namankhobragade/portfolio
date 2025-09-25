// src/app/api/images/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

const UPLOADS_DIR = 'public/images/uploads';
const UPLOADS_URL_PATH = '/images/uploads';
const PLACEHOLDER_JSON_PATH = path.join(process.cwd(), 'src/lib/placeholder-images.json');

// Helper to read the image manifest
async function readManifest(): Promise<{ placeholderImages: ImagePlaceholder[] }> {
    try {
        const file = await fs.readFile(PLACEHOLDER_JSON_PATH, 'utf-8');
        return JSON.parse(file);
    } catch (error) {
        // If file doesn't exist, return a default structure
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return { placeholderImages: [] };
        }
        throw error;
    }
}

// Helper to write to the image manifest
async function writeManifest(data: { placeholderImages: ImagePlaceholder[] }): Promise<void> {
    await fs.writeFile(PLACEHOLDER_JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');
}


// GET /api/images - Fetches all images from the manifest
export async function GET() {
    try {
        const manifest = await readManifest();
        const images = manifest.placeholderImages.map(img => ({
            id: img.id,
            path: img.imageUrl,
        }));
        return NextResponse.json({ images });
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
        const fileUrl = path.join(UPLOADS_URL_PATH, uniqueFilename);

        // Save the file
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        // Add to manifest
        const manifest = await readManifest();
        const newImageEntry: ImagePlaceholder = {
            id: `upload-${path.parse(uniqueFilename).name}`,
            description: `User uploaded image: ${filename}`,
            imageUrl: fileUrl.replace(/\\/g, '/'), // Ensure forward slashes for URL
            imageHint: 'custom upload',
        };
        manifest.placeholderImages.unshift(newImageEntry);
        await writeManifest(manifest);
        
        return NextResponse.json({ success: true, image: newImageEntry });
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
        const manifest = await readManifest();

        const imageIndex = manifest.placeholderImages.findIndex(img => img.id === id);
        if (imageIndex === -1) {
            return NextResponse.json({ error: 'Image not found in manifest.' }, { status: 404 });
        }
        
        const [imageToDelete] = manifest.placeholderImages.splice(imageIndex, 1);
        
        // Only attempt to delete file if it's in the uploads directory
        if (imageToDelete.imageUrl.startsWith(UPLOADS_URL_PATH)) {
            const filePath = path.join(process.cwd(), 'public', imageToDelete.imageUrl);
            try {
                await fs.unlink(filePath);
            } catch (error) {
                // Log error but don't fail the whole request if file is already gone
                console.warn(`Could not delete file ${filePath}:`, error);
            }
        }

        await writeManifest(manifest);
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Failed to delete image.' }, { status: 500 });
    }
}
