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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if it's a link
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const buttonClasses = "w-full block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center transition-colors duration-200 font-bold";

  return (
    <div className="flex-grow flex flex-col p-6 pt-2">
      <p className="mb-6">
        {description}
      </p>
      <div className="mt-auto">
        {buttonHref ? (
          <a 
            href={buttonHref}
            onClick={handleClick}
            className={buttonClasses}
          >
            {buttonText}
          </a>
        ) : (
          <button
            onClick={handleClick}
            className={buttonClasses}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
} 