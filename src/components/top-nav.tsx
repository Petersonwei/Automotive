'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { text as t } from '@/constants/text';

export default function TopNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-8">
            
            {/* Home */}
            <Link 
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.Contact}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}