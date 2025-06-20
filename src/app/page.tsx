import { text as t } from '@/constants/text';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay - adapts to dark/light mode */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content">
          <h1>Welcome to G Automotive</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>
        </div>
      </section>

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
    </main>
  );
}