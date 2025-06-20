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
    <div className="rounded-lg overflow-hidden">
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