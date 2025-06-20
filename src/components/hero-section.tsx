'use client';

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
    <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark Overlay - consistent regardless of theme */}
      <div 
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 to-black/60"
      />

      {/* Content - always white text */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          {title}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-200">
          {description}
        </p>
      </div>
    </section>
  );
} 