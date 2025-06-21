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

    // Check for demo section structure
    expect(screen.getByText('API Errors')).toBeInTheDocument();
    expect(screen.getByText('Form Validation')).toBeInTheDocument();
    
    // Check for demo buttons
    expect(screen.getByText('Simulate Fetch Error')).toBeInTheDocument();
    expect(screen.getByText('Simulate Success')).toBeInTheDocument();
    expect(screen.getByText('Show Validation Error')).toBeInTheDocument();
    expect(screen.getByText('Show Info Message')).toBeInTheDocument();
  });

  it('shows error toast when simulate fetch error is clicked', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Simulate Fetch Error'));

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data/)).toBeInTheDocument();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-red-500');
  });

  it('shows success toast when simulate success is clicked', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Simulate Success'));

    await waitFor(() => {
      expect(screen.getByText(/Operation completed successfully/)).toBeInTheDocument();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');
  });

  it('shows warning toast when show validation error is clicked', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Validation Error'));

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-yellow-500');
  });

  it('shows info toast when show info message is clicked', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Info Message'));

    await waitFor(() => {
      expect(screen.getByText(/Your session will expire in 5 minutes/)).toBeInTheDocument();
    });

    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-blue-500');
  });

  it('demo buttons work independently and show correct messages', async () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    // Test each button shows its specific message
    const testCases = [
      { button: 'Simulate Fetch Error', message: /Failed to fetch data/, class: 'border-red-500' },
      { button: 'Simulate Success', message: /Operation completed successfully/, class: 'border-green-500' },
      { button: 'Show Validation Error', message: /Please fill in all required fields/, class: 'border-yellow-500' },
      { button: 'Show Info Message', message: /Your session will expire/, class: 'border-blue-500' }
    ];

    for (const testCase of testCases) {
      fireEvent.click(screen.getByText(testCase.button));
      
      await waitFor(() => {
        expect(screen.getByText(testCase.message)).toBeInTheDocument();
      });

      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass(testCase.class);

      // Wait for toast to disappear before next test
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      }, { timeout: 4000 });
    }
  });

  it('demo section is clearly labeled as demonstration', () => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    );

    // The demo should be clearly identifiable as a demo
    expect(screen.getByText('API Errors')).toBeInTheDocument();
    expect(screen.getByText('Form Validation')).toBeInTheDocument();
    
    // Button text should indicate simulation/demo
    expect(screen.getByText('Simulate Fetch Error')).toBeInTheDocument();
    expect(screen.getByText('Simulate Success')).toBeInTheDocument();
  });
}); 