import Card from './ui/card';

interface CardData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
}

interface CardGridProps {
  cards: CardData[];
  highlightedCardId?: number;
}

export default function CardGrid({ cards, highlightedCardId }: CardGridProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            isHighlighted={card.id === highlightedCardId}
          />
        ))}
      </div>
    </div>
  );
} 