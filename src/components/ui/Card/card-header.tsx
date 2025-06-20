interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-6 pt-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
} 