// src/app/studio/layout.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Brush, Type, Bot, LayoutDashboard, Code, LogOut, Send, Users, Library } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { logoutStudio } from '@/app/actions';
import { Button } from '@/components/ui/button';

const studioNavLinks = [
    { href: '/studio', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/studio/general', label: 'General', icon: Settings },
    { href: '/studio/skills', label: 'Skills', icon: Code },
    { href: '/studio/theme', label: 'Theme', icon: Brush },
    { href: '/studio/typography', label: 'Typography', icon: Type },
    { href: '/studio/content', label: 'Content AI', icon: Bot },
    { href: '/studio/images', label: 'Image Library', icon: Library },
    { href: '/studio/submissions', label: 'Submissions', icon: Send },
    { href: '/studio/visitors', label: 'Visitors', icon: Users },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The middleware now handles redirection, so this check can be simplified.
  if (pathname === '/studio/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 flex flex-col">
        <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline">Studio</h2>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>
        <nav className="flex flex-col gap-2 flex-grow">
          {studioNavLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href ? 'bg-primary/10 text-primary' : ''
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
            <div className="flex justify-between items-center">
                 <Button variant="ghost" className="flex items-center gap-3 justify-start px-3 py-2 text-muted-foreground transition-all hover:text-primary" asChild>
                    <Link href="/">
                        <Home className="h-4 w-4" />
                        Back to Site
                    </Link>
                </Button>
                <ThemeToggle />
            </div>
            <form action={logoutStudio}>
                <Button variant="outline" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </form>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
