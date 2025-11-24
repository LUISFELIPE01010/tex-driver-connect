import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-van-road.jpg";
import { useTranslation } from "@/contexts/TranslationContext";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: 'center center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="text-background">{t.hero.title}</span>
            <span className="block text-3xl md:text-6xl lg:text-7xl mt-3 md:mt-4 animate-pulse-slow text-[#fd5e02]">
              {t.hero.earnings}
            </span>
            <span className="block text-xl md:text-3xl lg:text-4xl text-background/95 mt-3 md:mt-4">
              {t.hero.subtitle}
            </span>
          </h1>

          <div className="h-1 w-24 bg-primary my-4 md:my-6 rounded-full"></div>

          <Button 
            asChild 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-10 py-5 md:py-7 shadow-2xl hover:scale-105 transition-all animate-bounce-subtle w-full sm:w-auto"
          >
            <Link to="/cadastro">
              {t.hero.cta}
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
