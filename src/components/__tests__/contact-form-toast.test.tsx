import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '../ui/toast-context';
import ContactPage from '../../app/contact/page';

describe('Contact Form Toast Integration', () => {
  beforeEach(() => {
    // Clear any existing toasts
    document.body.innerHTML = '';
  });

  it('shows success toast when form is submitted correctly', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), '0412345678');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough characters');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show success toast
    await waitFor(() => {
      expect(screen.getByText(/Message received!/)).toBeInTheDocument();
    });

    // Should have success styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');

    // Form should be reset
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/phone/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });
  });

  it('shows warning toast when required fields are missing', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Try to submit empty form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show warning toast
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should have warning styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-yellow-500');
  });

  it('handles form submission without phone number', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill form without phone (optional field)
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message without phone');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show success toast
    await waitFor(() => {
      expect(screen.getByText(/Message received!/)).toBeInTheDocument();
    });

    // Should have success styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');
  });
}); 