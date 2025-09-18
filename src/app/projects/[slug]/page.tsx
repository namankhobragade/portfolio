
import { PROJECTS_DATA } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MarkdownContent } from '@/components/markdown-content';
import { ShareButtons } from '@/components/share-buttons';
import type { Metadata, ResolvingMetadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';

type Props = {
  params: { slug: string };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

// Find project data by slug
const getProjectBySlug = (slug: string) => {
  return PROJECTS_DATA.find((p) => p.slug === slug);
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const projectImage = PlaceHolderImages.find((p) => p.id === project.imageId);
  const imageUrl = projectImage ? `${siteUrl}${projectImage.imageUrl.startsWith('/') ? '' : '/'}${projectImage.imageUrl}` : `${siteUrl}/og-image.png`;

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      type: 'article',
      url: `${siteUrl}/projects/${project.slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [imageUrl],
    }
  };
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const projectImage = PlaceHolderImages.find((p) => p.id === project.imageId);

  return (
    <article className="container max-w-4xl py-12 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <Button asChild variant="ghost">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        <ShareButtons title={project.title} slug={`projects/${project.slug}`} />
      </div>

      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-4">{project.title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
      
      {projectImage && (
        <Image
          src={projectImage.imageUrl}
          alt={project.title}
          data-ai-hint={projectImage.imageHint}
          width={1200}
          height={675}
          className="aspect-video w-full object-cover rounded-lg mb-8 border"
          priority
        />
      )}

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
            </div>
        </div>
        <div>
            <h3 className="font-semibold text-lg mb-2">Security Focus</h3>
            <p className="text-muted-foreground">{project.securityFocus}</p>
        </div>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        <MarkdownContent content={project.caseStudy} />
      </div>

      <div className="flex flex-wrap gap-4 mt-12">
        {project.demoUrl && (
            <Button asChild variant="outline">
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live Demo
                </Link>
            </Button>
        )}
        {project.githubUrl && (
            <Button asChild variant="secondary">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
                </Link>
            </Button>
        )}
      </div>
    </article>
  );
}
