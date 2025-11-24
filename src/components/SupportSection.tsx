import { Headphones, MapPin, BarChart3, Laptop, Target, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";

const SupportSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    { icon: Headphones, text: t.supportSection.benefit1 },
    { icon: Award, text: t.supportSection.benefit2 },
    { icon: MapPin, text: t.supportSection.benefit3 },
    { icon: Laptop, text: t.supportSection.benefit4 },
    { icon: Target, text: t.supportSection.benefit5 },
    { icon: BarChart3, text: t.supportSection.benefit6 }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.supportSection.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.supportSection.subtitle}
          </p>
        </div>

        <div className="mb-12 max-w-5xl mx-auto">
          <img 
            alt="Equipe de suporte TEX Transportes" 
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl" 
            src="/lovable-uploads/c106c98e-96a7-4c70-9136-b7d3b7ed8861.png" 
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 shadow-[var(--card-shadow)] hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
                <Icon className="w-12 h-12 text-primary mb-4" />
                <p className="text-lg text-foreground font-medium">{benefit.text}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-primary mb-4">
            {t.supportSection.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
