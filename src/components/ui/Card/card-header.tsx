interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-4 pt-3">
      <h3 className="text-base font-semibold">
        {title}
      </h3>
    </div>
  );
} 