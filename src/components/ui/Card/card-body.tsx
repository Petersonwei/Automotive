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
      <div className="space-y-2.5 mb-4 min-h-[100px]">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="text-[11px] leading-relaxed text-justify hyphens-auto">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-auto pt-2">
        <Button 
          href={buttonHref}
          onClick={onButtonClick}
          className="w-full text-[11px] py-1 min-h-[28px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
} 