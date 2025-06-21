import Image from 'next/image';

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({ src, alt }: CardImageProps) {
  return (
    <div className="relative h-32 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-xs text-white font-medium">
          Learn More
        </span>
      </div>
    </div>
  );
} 