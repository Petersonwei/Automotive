interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-6 pt-6">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
    </div>
  );
} 