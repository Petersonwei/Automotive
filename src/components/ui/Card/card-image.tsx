import Image from 'next/image';

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({ src, alt }: CardImageProps) {
  return (
    <div className="relative w-full h-48 group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-medium">
          Learn More
        </span>
      </div>
    </div>
  );
} 