import { ChatbotDemo } from '@/components/landing/ChatbotDemo';
import { CtaSection } from '@/components/landing/CtaSection';
import { Features } from '@/components/landing/Features';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/layout/Footer';
import { MarketingNavbar } from '@/components/layout/MarketingNavbar';

export default function LandingPage() {
  return (
    <>
      <MarketingNavbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ChatbotDemo />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
