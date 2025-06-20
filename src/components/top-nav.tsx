'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { text as t } from '@/constants/text';
import ThemeToggle from './theme-toggle';

export default function TopNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            
            {/* Home */}
            <Link 
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-foreground hover:text-blue-500 hover:border-gray-300'
              }`}
            >
              {t.Home}
            </Link>
            
            {/* About */}
            <Link 
              href="/about"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/about') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-foreground hover:text-blue-500 hover:border-gray-300'
              }`}
            >
              {t.About}
            </Link>
            
            {/* Contact */}
            <Link 
              href="/contact"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/contact') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-foreground hover:text-blue-500 hover:border-gray-300'
              }`}
            >
              {t.Contact}
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}