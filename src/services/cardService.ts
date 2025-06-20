import cardData from '@/data/cards.json';

export interface Card {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCards(): Promise<Card[]> {
  // Simulate API call delay
  await delay(1000);
  return cardData.cards;
} 