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
    <div className="px-4 pb-4 flex flex-col h-full">
      <div className="space-y-3 mb-4 md:h-[100px]">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="text-[10px] md:text-[11px] leading-normal text-justify hyphens-auto">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-4">
        <Button 
          href={buttonHref}
          onClick={onButtonClick}
          className="w-full text-[11px] py-0.5 min-h-0"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
} 