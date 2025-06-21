import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('shows warning toast when email format is invalid', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill form with invalid email
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show warning toast
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should also show field-specific error
    expect(screen.getByText(/Invalid email address/)).toBeInTheDocument();
  });

  it('shows warning toast when message is too short', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill form with short message
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Short');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show warning toast
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should also show field-specific error
    expect(screen.getByText(/Message must be at least 10 characters/)).toBeInTheDocument();
  });

  it('shows warning toast when name is too short', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill form with short name
    await user.type(screen.getByLabelText(/name/i), 'J');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show warning toast
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should also show field-specific error
    expect(screen.getByText(/Name must be at least 2 characters/)).toBeInTheDocument();
  });

  it('validates phone number format when provided', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    // Fill form with invalid phone
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone/i), 'invalid-phone-123abc');
    await user.type(screen.getByLabelText(/message/i), 'This is a valid message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Should show warning toast
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all required fields correctly/)).toBeInTheDocument();
    });

    // Should also show field-specific error
    expect(screen.getByText(/Invalid phone number/)).toBeInTheDocument();
  });

  it('allows valid phone number formats', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ContactPage />
      </ToastProvider>
    );

    const validPhoneNumbers = [
      '0412345678',
      '04 1234 5678',
      '+61 412 345 678',
      '(07) 1234 5678'
    ];

    for (const phone of validPhoneNumbers) {
      // Clear form
      await user.clear(screen.getByLabelText(/name/i));
      await user.clear(screen.getByLabelText(/email/i));
      await user.clear(screen.getByLabelText(/phone/i));
      await user.clear(screen.getByLabelText(/message/i));

      // Fill form with valid data
      await user.type(screen.getByLabelText(/name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');
      await user.type(screen.getByLabelText(/phone/i), phone);
      await user.type(screen.getByLabelText(/message/i), 'This is a valid message');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }));

      // Should show success toast
      await waitFor(() => {
        expect(screen.getByText(/Message received!/)).toBeInTheDocument();
      });

      // Clear any existing toasts for next iteration
      const toasts = screen.queryAllByRole('alert');
      toasts.forEach(toast => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      });
    }
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