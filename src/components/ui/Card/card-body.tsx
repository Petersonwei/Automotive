import Button from '../button';

interface CardBodyProps {
  description: string;
}

export default function CardBody({
  description,
}: CardBodyProps) {
  return (
    <div className="px-6 py-4">
      <p className="text-gray-700">
        {description}
      </p>
    </div>
  );
} 