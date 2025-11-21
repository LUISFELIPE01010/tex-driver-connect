import { Link } from "react-router-dom";
import { Check, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MarketStrength = () => {
  const benefits = [
    "Pagamento por milhagem (0.75 a 0.85 cents)",
    "Demanda crescente em todo o país",
    "Resultados rápidos para quem trabalha com foco"
  ];

  const idealFor = [
    "Solteiros buscando renda alta",
    "Pais acostumados à estrada",
    "Pessoas reorganizando a vida financeira"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que o mercado de cargovan é tão forte?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            O setor se mantém estável independente da economia, clima ou estações.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <Card className="p-8 shadow-[var(--card-shadow)] hover:shadow-xl transition-shadow animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">Benefícios do setor</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 shadow-[var(--card-shadow)] bg-primary text-primary-foreground hover:shadow-xl transition-shadow animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Ideal para:</h3>
            <ul className="space-y-4">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform">
            <Link to="/cadastro">
              Quero Fazer Parte
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketStrength;
