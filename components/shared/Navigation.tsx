'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Map, MessageCircle, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/mentor', label: 'AI Mentor', icon: MessageCircle },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/6 bg-[#060d1b]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight">
            Discovery<span className="text-blue-400">OS</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
