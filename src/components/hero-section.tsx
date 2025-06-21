'use client';

import Image from 'next/image';
import Button from './ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HeroSection({ 
  title, 
  description, 
  imageUrl 
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-8 md:px-8 lg:px-6 text-center text-white">
        <div className="max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-xs md:text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>
        <div className="text-center">
          <Button href="/contact" className="min-w-[120px] !text-white text-[12px]">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
} 