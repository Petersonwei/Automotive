'use client';

import { useForm } from 'react-hook-form';
import HeroSection from '@/components/hero-section';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Implement form submission
    console.log('Form data:', data);
    // Here you would typically send the data to your backend
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
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
                {...register('phone')}
                type="tel"
                id="phone"
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                {...register('message', { required: 'Message is required' })}
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