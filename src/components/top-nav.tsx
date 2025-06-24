'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { text as t } from '@/constants/text';
import ThemeToggle from './theme-toggle';
import { MdMenu, MdClose } from "react-icons/md";

export default function TopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  const NavLinks = () => (
    <>
      {/* Home */}
      <Link 
        href="/"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          isActive('/') 
            ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' 
            : 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:border-gray-300'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t.Home}
      </Link>
      
      {/* About */}
      <Link 
        href="/about"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          isActive('/about') 
            ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' 
            : 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:border-gray-300'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t.About}
      </Link>
      
      {/* Contact */}
      <Link 
        href="/contact"
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
          isActive('/contact') 
            ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' 
            : 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:border-gray-300'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {t.Contact}
      </Link>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:space-x-8">
              <NavLinks />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-[var(--text-primary)] hover:text-[var(--primary)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 flex flex-col bg-background">
              <NavLinks />
            </div>
          )}
        </div>
      </nav>
      {/* Spacer to prevent content from going under the fixed nav */}
      <div className="h-16" />
    </>
  );
}