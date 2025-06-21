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
    <div className="px-6 py-4 flex flex-col">
      <p className="text-gray-700 mb-4">
        {description}
      </p>
      <div className="mt-auto">
        {buttonHref ? (
          <a 
            href={buttonHref}
            className="w-full block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center transition-colors duration-200"
          >
            {buttonText}
          </a>
        ) : (
          <button
            onClick={onButtonClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
} 