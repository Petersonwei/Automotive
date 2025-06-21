interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="px-4 pt-2">
      <h3 className="text-base font-black">
        {title}
      </h3>
    </div>
  );
} 