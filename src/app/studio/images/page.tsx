// src/app/studio/images/page.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Loader2, Copy } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ImageFile {
    id: string;
    path: string;
}

export default function ImageLibraryPage() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const { toast } = useToast();

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/images');
            if (!res.ok) throw new Error('Failed to fetch images.');
            const data = await res.json();
            setImages(data.images);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                description: error.message || 'Could not load images.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileUpload = async () => {
        if (!fileToUpload) {
            toast({
                variant: 'destructive',
                description: 'Please select a file to upload.',
            });
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const res = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Upload failed');
            }
            
            toast({ description: 'Image uploaded successfully!' });
            setFileToUpload(null);
            // Clear the input field visually
            const input = document.getElementById('picture') as HTMLInputElement;
            if (input) input.value = '';
            
            fetchImages(); // Refresh the list
        } catch (error: any) {
            toast({
                variant: 'destructive',
                description: error.message,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch('/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to delete image.');
            }

            toast({ description: 'Image deleted successfully.' });
            fetchImages();
        } catch (error: any) {
            toast({
                variant: 'destructive',
                description: error.message,
            });
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ description: `Copied "${text}" to clipboard.` });
    };

    return (
        <div className="space-y-8">
            <Card className="bg-transparent border">
                <CardHeader>
                    <CardTitle>Upload New Image</CardTitle>
                    <CardDescription>Upload a new image to your library. It will be stored in `public/images/uploads`.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture" type="file" onChange={(e) => setFileToUpload(e.target.files?.[0] || null)} accept="image/png, image/jpeg, image/gif, image/webp" />
                    </div>
                    <Button onClick={handleFileUpload} disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-transparent border">
                <CardHeader>
                    <CardTitle>Image Library</CardTitle>
                    <CardDescription>View and manage all images available to your application.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {images.map(image => (
                                <div key={image.id} className="group relative border rounded-lg overflow-hidden">
                                    <Image
                                        src={image.path}
                                        alt={image.id}
                                        width={300}
                                        height={200}
                                        className="aspect-[3/2] w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                        <div className="flex justify-end gap-1">
                                            <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => copyToClipboard(image.id)}>
                                                <Copy className="h-4 w-4" />
                                                <span className="sr-only">Copy ID</span>
                                            </Button>
                                             <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="icon" variant="destructive" className="h-7 w-7">
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will permanently delete the image file from your project and its entry from the manifest. This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(image.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                        <p className="text-xs text-white truncate bg-black/50 p-1 rounded">{image.id}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
