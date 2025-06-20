interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-6 pt-6">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>
    </div>
  );
} 