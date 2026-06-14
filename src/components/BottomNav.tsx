'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Info, Star, Phone, HelpCircle, Home } from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/sight-words', label: '50 Words', icon: Star },
  { href: '/instructions', label: 'How To', icon: HelpCircle },
  { href: '/about', label: 'About', icon: Info },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="wood-dark fixed bottom-0 left-0 right-0 z-50 flex flex-row"
      style={{
        height: '56px',
        boxShadow: '0 -3px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors"
            style={{ color: active ? '#fbbf24' : 'rgba(245,232,200,0.4)' }}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-bold leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
