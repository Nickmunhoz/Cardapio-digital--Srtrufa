import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/home/Hero";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { CardapioSection } from "@/components/home/CardapioSection";
import { NossaHistoriaSection } from "@/components/home/NossaHistoriaSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FaqSection } from "@/components/home/FaqSection";
import { OrderModalProvider } from "@/components/ui/OrderModalProvider";

export function App() {
  return (
    <OrderModalProvider>
      <div className="min-h-screen bg-marrom text-creme">
        <LoadingScreen />
        <Header />
        <AnnouncementBar />
        <main>
          <Hero />
          <CardapioSection />
          <NossaHistoriaSection />
          <HowItWorks />
          <FaqSection />
        </main>
        <Footer />
        <WhatsappFab />
      </div>
    </OrderModalProvider>
  );
}
