import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
  src: string;
  alt: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function CardImage({ src, alt, buttonText = "Learn More", buttonHref, onButtonClick }: CardImageProps) {
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
        {buttonHref ? (
          <Link 
            href={buttonHref}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            onClick={onButtonClick}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
} 