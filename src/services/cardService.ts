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

// For testing purposes - simulate network failures
const SIMULATE_FAILURE = process.env.NODE_ENV === 'test' && process.env.SIMULATE_CARD_FAILURE === 'true';

export async function getCards(): Promise<Card[]> {
  try {
    // Simulate failure for testing
    if (SIMULATE_FAILURE) {
      throw new Error('Simulated network failure for testing');
    }

    // TODO: Replace with actual API endpoint when ready
    // const { data } = await api.get<{ cards: Card[] }>('/cards');
    // return data.cards;
    
    // Mock API call with potential for failure
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random failures (10% chance) in development
    if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) {
      throw new Error('Random network failure simulation');
    }
    
    return cardData.cards;
  } catch (error) {
    console.error('Card service error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please check your internet connection');
      }
      if (error.response && error.response.status === 404) {
        throw new Error('Service not found - please try again later');
      }
      if (error.response && error.response.status >= 500) {
        throw new Error('Server error - please try again later');
      }
      throw new Error(`Network error: ${error.message}`);
    }
    
    // Re-throw other errors with more context
    throw new Error(`Failed to load services: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 