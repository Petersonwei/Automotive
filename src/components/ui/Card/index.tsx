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
  'data-testid'?: string;
}

export default function Card({
  title,
  description,
  imageSrc,
  buttonText,
  buttonHref,
  onButtonClick,
  isHighlighted = false,
  'data-testid': testId
}: CardProps) {
  return (
    <div 
      data-testid={testId}
      className={`
        ${isHighlighted ? 'ring-4 ring-blue-600' : ''}
        rounded-md transition-all duration-300
      `}
      style={isHighlighted ? { 
        boxShadow: '0 0 0 4px #2563eb' 
      } : {}}
    >
      <div className="rounded-md overflow-hidden shadow-theme h-[320px] w-full flex flex-col">
        <CardImage 
          src={imageSrc}
          alt={title}
        />
        <div className="flex flex-col flex-grow">
          <CardHeader title={title} />
          <CardBody
            description={description}
            buttonText={buttonText}
            buttonHref={buttonHref}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

export { CardImage, CardHeader, CardBody }; 