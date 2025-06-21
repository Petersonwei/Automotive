import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Toast from '../ui/toast';
import { ToastProvider, useToast } from '../ui/toast-context';

// Test component to interact with toast context
function TestToastComponent() {
  const { showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast('Success message', 'success')}>
        Show Success
      </button>
      <button onClick={() => showToast('Error message', 'error')}>
        Show Error
      </button>
      <button onClick={() => showToast('Warning message', 'warning')}>
        Show Warning
      </button>
      <button onClick={() => showToast('Info message', 'info')}>
        Show Info
      </button>
    </div>
  );
}

describe('Toast Component', () => {
  beforeEach(() => {
    // Clear any existing toasts
    document.body.innerHTML = '';
  });

  it('renders toast with correct message and type', async () => {
    const onClose = jest.fn();
    
    render(
      <Toast 
        message="Test message" 
        type="success" 
        onClose={onClose}
        duration={5000}
      />
    );

    // Toast should be rendered in document.body via portal
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    // Should have success styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');
  });

  it('auto-dismisses after specified duration', async () => {
    const onClose = jest.fn();
    
    render(
      <Toast 
        message="Auto dismiss test" 
        type="info" 
        onClose={onClose}
        duration={100} // Short duration for testing
      />
    );

    // Toast should be visible initially
    await waitFor(() => {
      expect(screen.getByText('Auto dismiss test')).toBeInTheDocument();
    });

    // Should auto-dismiss after duration
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 200 });
  });

  it('can be manually dismissed by clicking close button', async () => {
    const onClose = jest.fn();
    
    render(
      <Toast 
        message="Manual dismiss test" 
        type="warning" 
        onClose={onClose}
        duration={5000}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Manual dismiss test')).toBeInTheDocument();
    });

    // Click close button
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('displays correct icons for different types', async () => {
    const types = ['success', 'error', 'warning', 'info'] as const;
    
    for (const type of types) {
      const onClose = jest.fn();
      const { unmount } = render(
        <Toast 
          message={`${type} message`} 
          type={type} 
          onClose={onClose}
          duration={5000}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      });

      // Check for SVG icon presence
      const toast = screen.getByRole('alert');
      const svgIcon = toast.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();

      unmount();
    }
  });
});

describe('Toast Context', () => {
  it('provides showToast function to child components', () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    // All buttons should be rendered
    expect(screen.getByText('Show Success')).toBeInTheDocument();
    expect(screen.getByText('Show Error')).toBeInTheDocument();
    expect(screen.getByText('Show Warning')).toBeInTheDocument();
    expect(screen.getByText('Show Info')).toBeInTheDocument();
  });

  it('displays toast when showToast is called', async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    // Click success button
    fireEvent.click(screen.getByText('Show Success'));

    // Toast should appear
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    // Should have success styling
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('border-green-500');
  });

  it('only shows one toast at a time', async () => {
    render(
      <ToastProvider>
        <TestToastComponent />
      </ToastProvider>
    );

    // Click multiple buttons quickly
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));

    // Should only show the last toast
    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    // Success message should not be visible
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  it('throws error when used outside ToastProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestToastComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });
}); 