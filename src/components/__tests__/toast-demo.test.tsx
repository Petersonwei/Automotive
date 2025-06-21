import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider } from '../ui/toast-context';
import ToastDemo from '../toast-demo';

describe('Toast Demo Component', () => {
  beforeEach(() => {
    // Clear any existing toasts
    document.body.innerHTML = '';
  });

  it('renders all demo buttons', () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    // Check that all buttons are present
    expect(screen.getByText('Simulate Fetch Error')).toBeInTheDocument();
    expect(screen.getByText('Simulate Success')).toBeInTheDocument();
    expect(screen.getByText('Show Validation Error')).toBeInTheDocument();
    expect(screen.getByText('Show Info Message')).toBeInTheDocument();
  });

  it('shows error toast when clicking fetch error button', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const errorButton = screen.getByText('Simulate Fetch Error');
    fireEvent.click(errorButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data/)).toBeInTheDocument();
    });

    // Should have error styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-red-500');
  });

  it('shows success toast when clicking success button', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const successButton = screen.getByText('Simulate Success');
    fireEvent.click(successButton);

    await waitFor(() => {
      expect(screen.getByText(/Operation completed successfully/)).toBeInTheDocument();
    });

    // Should have success styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');
  });

  it('shows warning toast when clicking validation error button', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const warningButton = screen.getByText('Show Validation Error');
    fireEvent.click(warningButton);

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should have warning styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-yellow-500');
  });

  it('shows info toast when clicking info button', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const infoButton = screen.getByText('Show Info Message');
    fireEvent.click(infoButton);

    await waitFor(() => {
      expect(screen.getByText(/Your session will expire in 5 minutes/)).toBeInTheDocument();
    });

    // Should have info styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-blue-500');
  });

  it('can close toast by clicking close button', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    const errorButton = screen.getByText('Simulate Fetch Error');
    fireEvent.click(errorButton);

    // Wait for toast to appear
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Click close button
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Toast should disappear
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
}); 