"use client";

import { summarizeSecurityBlogSnippet } from '@/ai/flows/security-blog-snippets';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function BlogSummary({ content }: { content: string }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getSummary() {
      try {
        const result = await summarizeSecurityBlogSnippet({ blogPostContent: content });
        setSummary(result.summary);
      } catch (e) {
        console.error("Failed to generate summary:", e);
        // Fallback to a truncated summary in case of AI error
        setSummary(content.substring(0, 150) + '...');
        setError("Could not generate AI summary.");
      }
    }
    getSummary();
  }, [content]);

  if (summary === null) {
    return <Skeleton className="h-16 w-full" />;
  }

  return <p className="text-muted-foreground">{summary}</p>;
}
