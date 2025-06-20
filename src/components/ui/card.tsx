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
      rounded-lg shadow-lg overflow-hidden min-h-[32rem] flex flex-col
      ${isHighlighted ? 'ring-2 ring-blue-600' : ''}
      transition-all duration-300 ease-in-out
    `}>
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        
        <p className="mb-6">
          {description}
        </p>

        <div className="mt-auto">
          <Button
            onClick={onButtonClick}
            variant="primary"
            className="w-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
} 