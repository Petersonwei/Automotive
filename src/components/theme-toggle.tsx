'use client';

import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-md bg-background text-foreground hover:text-blue-500"
    >
      {isDark ? <MdOutlineLightMode size={20} /> : <MdDarkMode size={20} />}
    </button>
  );
} 