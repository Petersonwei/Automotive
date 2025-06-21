'use client';

import { useForm } from 'react-hook-form';
import HeroSection from '@/components/hero-section';
import { useToast } from '@/components/ui/toast-context';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const { showToast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message - no actual sending required
      console.log('Form data (not sent):', data);
      showToast('Message received! We\'ll get back to you soon.', 'success');
      
      // Reset form
      reset();
    } catch (error) {
      // This shouldn't happen in this simplified version, but keeping for safety
      showToast('Something went wrong. Please try again.', 'error');
    }
  };

  // Show validation errors as toasts
  const onError = () => {
    showToast('Please fill in all required fields correctly.', 'warning');
  };

  return (
    <main>
      <HeroSection
        title="Contact Us"
        description="Have a question or need assistance? We're here to help! Reach out to our team and we'll get back to you as soon as possible."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />
      
      <section className="max-w-[800px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-4">Get in Touch</h2>
              <p className="text-sm leading-relaxed">
                We'd love to hear from you. Please fill out the form or use our contact information below.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Address</h3>
                <p className="text-sm">
                  123 Automotive Drive<br />
                  Brisbane, QLD 4000
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Phone</h3>
                <p className="text-sm">
                  (07) 1234 5678
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <p className="text-sm">
                  info@gautomotive.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
                type="text"
                id="name"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                id="email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                {...register('phone', {
                  pattern: {
                    value: /^[0-9\s+()-]*$/,
                    message: 'Invalid phone number'
                  }
                })}
                type="tel"
                id="phone"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                {...register('message', { 
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  }
                })}
                id="message"
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}