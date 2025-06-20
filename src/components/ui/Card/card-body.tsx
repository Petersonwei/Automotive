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
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>
      <Button
        href={buttonHref}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
} 