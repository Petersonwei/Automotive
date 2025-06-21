import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ToastProvider } from '../ui/toast-context';
import HomePage from '../../app/page';

// Mock the card service
jest.mock('../../services/cardService', () => ({
  getCards: jest.fn(),
  Card: {}
}));

import { getCards } from '../../services/cardService';
const mockGetCards = getCards as jest.MockedFunction<typeof getCards>;

describe('Card Service Toast Integration', () => {
  beforeEach(() => {
    // Clear any existing toasts
    document.body.innerHTML = '';
    // Reset mocks
    jest.clearAllMocks();
  });

  it('shows error toast when card service fails', async () => {
    // Mock a failed card fetch
    mockGetCards.mockRejectedValue(new Error('Network error'));

    render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    // Should show loading initially
    expect(screen.getByText('Loading services...')).toBeInTheDocument();

    // Should show error toast when fetch fails
    await waitFor(() => {
      expect(screen.getByText(/Failed to load content/)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Should have error styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-red-500');

    // Should show fallback content
    await waitFor(() => {
      expect(screen.getByText('Services Currently Unavailable')).toBeInTheDocument();
    });
  });

  it('shows cards normally when service succeeds', async () => {
    // Mock successful card fetch
    const mockCards = [
      {
        id: 1,
        title: 'Test Service',
        description: 'Test description',
        imageSrc: '/test.jpg',
        buttonText: 'Learn More'
      }
    ];
    mockGetCards.mockResolvedValue(mockCards);

    render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    // Should show loading initially
    expect(screen.getByText('Loading services...')).toBeInTheDocument();

    // Should show cards when loaded successfully
    await waitFor(() => {
      expect(screen.getByText('Test Service')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Should not show error toast
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    // Should not show fallback content
    expect(screen.queryByText('Services Currently Unavailable')).not.toBeInTheDocument();
  });

  it('shows timeout error message', async () => {
    mockGetCards.mockRejectedValue(new Error('Request timeout - please check your internet connection'));

    render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    // Should show the generic error message (since we catch all errors and show the same message)
    await waitFor(() => {
      expect(screen.getByText(/Failed to load content/)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Should have error styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-red-500');
  });

  it('does not show toast during normal loading', async () => {
    // Mock a slow but successful fetch
    mockGetCards.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve([]), 100)
      )
    );

    render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    // Should show loading
    expect(screen.getByText('Loading services...')).toBeInTheDocument();

    // Should not show any toast during loading
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading services...')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles multiple rapid failures gracefully', async () => {
    mockGetCards.mockRejectedValue(new Error('Network error'));

    // Render multiple times rapidly
    const { unmount } = render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    unmount();

    render(
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    );

    // Should still show error toast correctly
    await waitFor(() => {
      expect(screen.getByText(/Failed to load content/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 