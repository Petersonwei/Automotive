import HeroSection from '@/components/hero-section';

export default function AboutPage() {
  return (
    <main>
      <HeroSection
        title="About G Automotive"
        description="With over 20 years of experience in the automotive industry, we pride ourselves on delivering exceptional service and expertise. Our commitment to quality and customer satisfaction has made us a trusted name in vehicle sales, maintenance, and customization."
        imageUrl="https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg"
      />
      
      <section className="max-w-[800px] mx-auto px-6 py-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">Our Story</h2>
            <p className="text-sm leading-relaxed">
              Founded in 2000, G Automotive has grown from a small local dealership to a comprehensive automotive center. Our journey has been driven by a passion for cars and a dedication to providing the best possible service to our customers.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-sm leading-relaxed">
              We strive to provide our customers with the highest quality vehicles and services while maintaining the utmost integrity and professionalism. Our goal is to make your automotive experience as seamless and satisfying as possible.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-2">
              <li>Integrity in every transaction</li>
              <li>Excellence in service delivery</li>
              <li>Customer satisfaction as our priority</li>
              <li>Continuous improvement and innovation</li>
              <li>Community engagement and support</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}