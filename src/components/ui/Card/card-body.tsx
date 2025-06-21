import Button from '../button';

interface CardBodyProps {
  description: string;
  buttonText: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export default function CardBody({
  description,
  buttonText,
  buttonHref,
  onButtonClick
}: CardBodyProps) {
  return (
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-xs mb-4">
        {description}
      </p>
      <div className="mt-auto">
        <Button 
          href={buttonHref}
          onClick={onButtonClick}
          className="w-full text-sm py-1.5"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
} 