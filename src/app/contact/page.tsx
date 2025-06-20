import { text as t } from '@/constants/text';

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t.ContactUs}</h1>
      <div className="max-w-2xl mx-auto">
        {/* Contact form will be added here */}
      </div>
    </main>
  );
}