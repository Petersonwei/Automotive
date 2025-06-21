import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardGrid from '../card-grid';

const mockCards = [
  {
    id: 1,
    title: "Card 1",
    description: "Description 1",
    imageSrc: "/test1.jpg",
    buttonText: "Button 1"
  },
  {
    id: 2,
    title: "Card 2",
    description: "Description 2",
    imageSrc: "/test2.jpg",
    buttonText: "Button 2"
  },
  {
    id: 3,
    title: "Card 3",
    description: "Description 3",
    imageSrc: "/test3.jpg",
    buttonText: "Button 3"
  }
];

describe('CardGrid', () => {
  it('highlights middle card by default', () => {
    render(<CardGrid cards={mockCards} />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(3);
    
    // Middle card should have highlight class
    expect(cards[1]).toHaveClass('ring-4 ring-blue-600');
    // Other cards should not have highlight
    expect(cards[0]).not.toHaveClass('ring-4 ring-blue-600');
    expect(cards[2]).not.toHaveClass('ring-4 ring-blue-600');
  });

  it('changes highlight when clicking card buttons', () => {
    render(<CardGrid cards={mockCards} />);
    
    const buttons = screen.getAllByRole('button');
    const cards = screen.getAllByTestId('card');
    
    // Click first card's button
    fireEvent.click(buttons[0]);
    expect(cards[0]).toHaveClass('ring-4 ring-blue-600');
    expect(cards[1]).not.toHaveClass('ring-4 ring-blue-600');
    expect(cards[2]).not.toHaveClass('ring-4 ring-blue-600');
    
    // Click last card's button
    fireEvent.click(buttons[2]);
    expect(cards[2]).toHaveClass('ring-4 ring-blue-600');
    expect(cards[0]).not.toHaveClass('ring-4 ring-blue-600');
    expect(cards[1]).not.toHaveClass('ring-4 ring-blue-600');
  });

  it('renders correct number of cards with proper content', () => {
    render(<CardGrid cards={mockCards} />);
    
    // Verify all cards are rendered
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
    
    // Verify buttons are rendered
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
    expect(screen.getByText('Button 3')).toBeInTheDocument();
  });

  it('only one card can be highlighted at a time', () => {
    render(<CardGrid cards={mockCards} />);
    
    const buttons = screen.getAllByRole('button');
    const cards = screen.getAllByTestId('card');
    
    // Click each button and verify only one card is highlighted
    buttons.forEach((button, index) => {
      fireEvent.click(button);
      
      cards.forEach((card, cardIndex) => {
        if (cardIndex === index) {
          expect(card).toHaveClass('ring-4 ring-blue-600');
        } else {
          expect(card).not.toHaveClass('ring-4 ring-blue-600');
        }
      });
    });
  });

  it('handles empty cards array gracefully', () => {
    render(<CardGrid cards={[]} />);
    
    const cards = screen.queryAllByTestId('card');
    expect(cards).toHaveLength(0);
  });
}); 