'use client';

import { useState, useEffect } from 'react';
import Card from './ui/Card';

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
}

export default function CardGrid({ cards }: CardGridProps) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  // Set middle card as active on initial load
  useEffect(() => {
    if (cards.length > 0) {
      const middleIndex = Math.floor((cards.length - 1) / 2);
      const middleCardId = cards[middleIndex].id;
      setActiveCardId(middleCardId);
    }
  }, [cards]);

  const handleButtonClick = (cardId: number) => {
    setActiveCardId(cardId);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`w-full max-w-[280px] sm:max-w-none mx-auto ${
              cards.length % 2 !== 0 && index === cards.length - 1 
                ? 'sm:col-span-2 lg:col-span-1 sm:mx-auto'
                : ''
            }`}
          >
            <Card
              {...card}
              isHighlighted={card.id === activeCardId}
              onButtonClick={() => handleButtonClick(card.id)}
              data-testid="card"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 