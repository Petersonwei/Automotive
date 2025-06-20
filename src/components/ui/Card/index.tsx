import CardImage from './card-image';
import CardHeader from './card-header';
import CardBody from './CardBody';

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
      bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
      ${isHighlighted ? 'ring-2 ring-blue-600' : ''}
      transition-all duration-200 hover:shadow-xl
    `}>
      <CardImage src={imageSrc} alt={title} />
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