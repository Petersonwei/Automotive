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
    <div className="px-6 py-4">
      <p className="mb-4">
        {description}
      </p>
      <div className="text-center">
        <Button
          href={buttonHref}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
} 