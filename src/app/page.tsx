'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/components/hero-section';
import CardGrid from '@/components/card-grid';
import ToastDemo from '@/components/toast-demo';
import Loading from './loading';
import { useToast } from '@/components/ui/toast-context';
import { getCards, Card } from '@/services/cardService';

export default function HomePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const cardData = await getCards();
        setCards(cardData);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
        showToast('Failed to load content. Please refresh the page to try again.', 'error');
        // Fallback to empty array or default cards
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [showToast]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <HeroSection
        title="Welcome to
G
Automotive"
        description="Experience excellence in automotive care. We specialize in comprehensive vehicle services, from routine maintenance to advanced repairs. Our team of certified technicians combines cutting-edge technology with years of expertise to keep your vehicle performing at its best. Whether you drive a family SUV, a luxury sedan, or a rugged pickup, we're committed to providing exceptional service that you can trust."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />
      
      {cards.length > 0 ? (
        <CardGrid cards={cards} />
      ) : (
        <div className="max-w-[800px] mx-auto px-4 py-12 text-center">
          <h2>Services Currently Unavailable</h2>
          <p>We're having trouble loading our services. Please try refreshing the page.</p>
        </div>
      )}

      {/* Typography Examples Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2>About Our Services</h2>
        <p>
          We provide comprehensive automotive solutions tailored to your needs. Our team of experts ensures
          your vehicle receives the best care possible with state-of-the-art equipment and techniques.
        </p>

        <h3>Quality Assurance</h3>
        <p>
          Every service we provide undergoes rigorous quality checks to ensure your satisfaction. We take
          pride in maintaining the highest standards in automotive care and customer service.
        </p>

        <h3>Expert Team</h3>
        <p>
          Our certified technicians bring years of experience and expertise to every job. We continuously
          train and update our skills to stay ahead of the latest automotive technologies.
        </p>

        <div className="mt-8">
          <span className="text-caption">
            * All our services come with a comprehensive warranty and satisfaction guarantee
          </span>
        </div>
      </section>

      {/* Toast Demo Section */}
      <section className="max-w-[800px] mx-auto px-6 py-12 space-y-8">
        <h2>Error Handling Examples</h2>
        <p className="text-sm">
          This section demonstrates different types of error notifications using our toast system.
          Click the buttons below to see how different error scenarios are handled.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToastDemo />
        </div>
      </section>
    </main>
  );
}