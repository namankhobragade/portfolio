// src/components/markdown-content.tsx
"use client";

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from './ui/button';
import { Clipboard, Check } from 'lucide-react';
import { useState } from 'react';

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const [copied, setCopied] = useState(false);

          const handleCopy = () => {
            navigator.clipboard.writeText(String(children));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          };

          return match ? (
            <div className="relative my-4 rounded-lg bg-[#1e1e1e]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                <span className="text-xs text-gray-400">{match[1]}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-muted text-foreground rounded px-1 py-0.5 font-mono text-sm" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
