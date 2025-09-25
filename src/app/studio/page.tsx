'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Brush, Code, Settings, Type } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: 'General Settings',
    description: 'Update your personal info, SEO settings, and social media links.',
    icon: Settings,
    href: '/studio/general',
  },
  {
    title: 'Skills Manager',
    description: 'Add, edit, or remove the skills displayed in your portfolio.',
    icon: Code,
    href: '/studio/skills',
  },
  {
    title: 'Theme Customizer',
    description: 'Change the color scheme of your website to match your brand.',
    icon: Brush,
    href: '/studio/theme',
  },
    {
    title: 'Typography',
    description: 'Customize the fonts used for headlines and body text.',
    icon: Type,
    href: '/studio/typography',
  },
  {
    title: 'AI Content Studio',
    description: 'Generate new blog posts, complete with unique images, using AI.',
    icon: Bot,
    href: '/studio/content',
  },
];

export default function StudioDashboardPage() {
    return (
        <div>
            <div className="space-y-3 mb-12">
                <h1 className="text-4xl font-bold tracking-tighter md:text-5xl/tight font-headline">Welcome to Your Studio</h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                   This is your creative and administrative command center. Use the tools below to manage your portfolio content and customize its appearance.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <Link href={feature.href} key={feature.title} className="block hover:-translate-y-1 transition-transform duration-300">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
