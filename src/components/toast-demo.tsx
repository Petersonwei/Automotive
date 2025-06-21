'use client';

import { useToast } from '@/components/ui/toast-context';
import Button from '@/components/ui/button';

export default function ToastDemo() {
  const { showToast } = useToast();

  const handleFetchError = () => {
    showToast('Failed to fetch data. Please check your internet connection.', 'error');
  };

  const handleValidationError = () => {
    showToast('Please fill in all required fields correctly.', 'warning');
  };

  const handleSuccess = () => {
    showToast('Operation completed successfully!', 'success');
  };

  const handleInfo = () => {
    showToast('Your session will expire in 5 minutes.', 'info');
  };

  return (
    <>
      <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--foreground)' }}>
        <h3>API Errors</h3>
        <div className="space-y-2 mt-4">
          <Button onClick={handleFetchError} className="w-full">
            Simulate Fetch Error
          </Button>
          <Button onClick={handleSuccess} className="w-full">
            Simulate Success
          </Button>
        </div>
      </div>

      <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--foreground)' }}>
        <h3>Form Validation</h3>
        <div className="space-y-2 mt-4">
          <Button onClick={handleValidationError} className="w-full">
            Show Validation Error
          </Button>
          <Button onClick={handleInfo} className="w-full">
            Show Info Message
          </Button>
        </div>
      </div>
    </>
  );
} 