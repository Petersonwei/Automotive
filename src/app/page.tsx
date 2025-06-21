import HeroSection from '@/components/hero-section';
import CardGrid from '@/components/card-grid';
import ToastDemo from '@/components/toast-demo';
import { cards } from '@/data/cards.json';

export default function HomePage() {
  return (
    <main>
      <HeroSection
        title="Welcome to G Automotive"
        description="Experience excellence in automotive care. We specialize in comprehensive vehicle services, from routine maintenance to advanced repairs. Our team of certified technicians combines cutting-edge technology with years of expertise to keep your vehicle performing at its best. Whether you drive a family SUV, a luxury sedan, or a rugged pickup, we're committed to providing exceptional service that you can trust."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />
      
      <CardGrid cards={cards} />

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