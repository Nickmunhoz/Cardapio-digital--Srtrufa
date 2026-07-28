import { Header }             from "@/components/layout/Header";
import { Footer }             from "@/components/layout/Footer";
import { WhatsappFab }        from "@/components/layout/WhatsappFab";
import { LoadingScreen }      from "@/components/layout/LoadingScreen";
import { OrderModalProvider } from "@/components/ui/OrderModalProvider";

import { AnnouncementBar }      from "@/components/home/AnnouncementBar";
import { Hero }                 from "@/components/home/Hero";
import { ManifestoSection }     from "@/components/home/ManifestoSection";
import { FlavorCarouselSection } from "@/components/home/FlavorCarouselSection";
import { BrandStatsSection }    from "@/components/home/BrandStatsSection";
import { MarqueeSection }       from "@/components/home/MarqueeSection";
import { CardapioSection }      from "@/components/home/CardapioSection";
import { NossaHistoriaSection } from "@/components/home/NossaHistoriaSection";
import { HowItWorks }           from "@/components/home/HowItWorks";
import { FaqSection }           from "@/components/home/FaqSection";
import { CTAFinalSection }      from "@/components/home/CTAFinalSection";

export function App() {
  return (
    <OrderModalProvider>
      <div className="min-h-screen bg-marrom text-creme">
        <LoadingScreen />
        <Header />
        <AnnouncementBar />
        <main>
          <Hero />
          <ManifestoSection />
          <FlavorCarouselSection />
          <BrandStatsSection />
          <MarqueeSection />
          <CardapioSection />
          <NossaHistoriaSection />
          <HowItWorks />
          <FaqSection />
          <CTAFinalSection />
        </main>
        <Footer />
        <WhatsappFab />
      </div>
    </OrderModalProvider>
  );
}
