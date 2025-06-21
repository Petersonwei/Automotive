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
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
          {title}
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-gray-200 mb-6">
          {description}
        </p>
        <div className="text-center">
          <Button href="/contact">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
} 