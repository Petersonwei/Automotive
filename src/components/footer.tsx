import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto" style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3>G Automotive</h3>
            <p className="mb-4">Your trusted partner in automotive excellence since 2000.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs md:text-sm hover:opacity-80" style={{ color: 'inherit' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs md:text-sm hover:opacity-80" style={{ color: 'inherit' }}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs md:text-sm hover:opacity-80" style={{ color: 'inherit' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3>Contact Us</h3>
            <address className="not-italic">
              <p>123 Auto Drive</p>
              <p>Automotive City, AC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@gautomotive.com</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-opacity-20" style={{ borderColor: 'var(--background)' }}>
          <p className="text-caption opacity-80">
            © {new Date().getFullYear()} G Automotive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 