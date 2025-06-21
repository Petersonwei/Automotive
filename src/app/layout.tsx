import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";
import { ToastProvider } from "@/components/ui/toast-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G Automotive",
  description: "Experience excellence in automotive care. Comprehensive vehicle services, from routine maintenance to advanced repairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ToastProvider>
          <TopNav />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
