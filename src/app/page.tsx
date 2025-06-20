import HeroSection from '@/components/hero-section';
import CardGrid from '@/components/card-grid';

const serviceCards = [
  {
    id: 1,
    title: "Vehicle Maintenance",
    description: "Regular maintenance services to keep your vehicle running smoothly. Our expert technicians use state-of-the-art equipment for all service needs.",
    imageSrc: "https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg",
    buttonText: "Learn More",
    buttonHref: "/services/maintenance"
  },
  {
    id: 2,
    title: "Repair Services",
    description: "Professional repair services for all makes and models. From minor fixes to major repairs, we've got you covered.",
    imageSrc: "https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg",
    buttonText: "View Services",
    buttonHref: "/services/repairs"
  },
  {
    id: 3,
    title: "Custom Solutions",
    description: "Tailored automotive solutions to meet your specific needs. We work with you to understand your requirements and deliver the best results.",
    imageSrc: "https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg",
    buttonText: "Get Started",
    buttonHref: "/services/custom"
  }
];

export default function Home() {
  return (
    <main>
      <HeroSection 
        title="Welcome to G Automotive"
        description="Experience excellence in automotive care. We specialize in comprehensive vehicle services, 
        from routine maintenance to advanced repairs. Our team of certified technicians combines cutting-edge 
        technology with years of expertise to keep your vehicle performing at its best. Whether you drive a 
        family SUV, a luxury sedan, or a rugged pickup, we're committed to providing exceptional service 
        that you can trust."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />

      {/* Services Cards Section */}
      <CardGrid cards={serviceCards} highlightedCardId={2} />

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