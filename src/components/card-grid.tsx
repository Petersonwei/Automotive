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
      setActiveCardId(cards[middleIndex].id);
    }
  }, [cards]);

  const handleCardClick = (cardId: number) => {
    setActiveCardId(cardId);
  };

  const handleButtonClick = (cardId: number, href?: string) => {
    if (href) {
      // If href exists, let the default link behavior handle it
      return;
    }
    // If no href, handle the button click
    setActiveCardId(cardId);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="w-full max-w-sm cursor-pointer"
            onClick={() => handleCardClick(card.id)}
          >
            <Card
              {...card}
              isHighlighted={card.id === activeCardId}
              onButtonClick={() => handleButtonClick(card.id, card.buttonHref)}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 