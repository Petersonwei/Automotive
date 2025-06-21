import CardImage from './card-image';
import CardHeader from './card-header';
import CardBody from './card-body';

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
    <div 
      className={`
        rounded-lg overflow-hidden shadow-lg 
        transition-all duration-300 
        hover:shadow-xl
        ${isHighlighted ? 'ring-2 ring-blue-600' : ''}
      `}
    >
      <CardImage 
        src={imageSrc} 
        alt={title} 
        buttonText={buttonText}
        buttonHref={buttonHref}
        onButtonClick={onButtonClick}
      />
      <CardHeader title={title} />
      <CardBody
        description={description}
        buttonText={buttonText}
        buttonHref={buttonHref}
        onButtonClick={onButtonClick}
      />
    </div>
  );
}

export { CardImage, CardHeader, CardBody }; 