import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <main>
      <HeroSection 
        title="Welcome to G Automotive"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />

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