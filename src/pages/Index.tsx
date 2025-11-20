import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EarningsPotential from "@/components/EarningsPotential";
import MarketStrength from "@/components/MarketStrength";
import SupportSection from "@/components/SupportSection";
import PaymentSection from "@/components/PaymentSection";
import VanOptions from "@/components/VanOptions";
import Requirements from "@/components/Requirements";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EarningsPotential />
      <MarketStrength />
      <SupportSection />
      <PaymentSection />
      <VanOptions />
      <Requirements />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
