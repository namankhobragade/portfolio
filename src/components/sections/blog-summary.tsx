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
        // Fallback to a truncated summary in case of any AI error (like rate limiting)
        const excerpt = content.split('. ').slice(0, 2).join('. ') + '.';
        setSummary(excerpt.length > 150 ? excerpt.substring(0, 150) + '...' : excerpt);
        setError("Could not generate AI summary.");
      }
    }
    getSummary();
  }, [content]);

  if (summary === null) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  return <p className="text-muted-foreground">{summary}</p>;
}
