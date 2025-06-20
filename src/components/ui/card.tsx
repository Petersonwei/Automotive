import Image from 'next/image';
import Button from './button';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  isHighlighted?: boolean;
}

export default function Card({
  title,
  description,
  imageSrc,
  buttonText,
  buttonHref,
  onButtonClick,
  isHighlighted = false
}: CardProps) {
  return (
    <div className={`
      rounded-lg shadow-lg overflow-hidden
      ${isHighlighted ? 'ring-2 ring-blue-600' : ''}
    `}>
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        
        <p className="mb-6 line-clamp-3">
          {description}
        </p>

        <Button
          href={buttonHref}
          onClick={onButtonClick}
          variant="primary"
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
} 