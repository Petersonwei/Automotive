import axios from 'axios';
import cardData from '@/data/cards.json';

export interface Card {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  buttonHref?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getCards(): Promise<Card[]> {
  try {
    // TODO: Replace with actual API endpoint when ready
    // const { data } = await api.get<{ cards: Card[] }>('/cards');
    // return data.cards;
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return cardData.cards;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch cards: ${error.message}`);
    }
    throw error;
  }
} 