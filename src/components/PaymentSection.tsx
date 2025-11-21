import { Link } from "react-router-dom";
import { Calendar, Zap, DollarSign, Truck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentSection = () => {
  const features = [
    { icon: Calendar, title: "Pagamento semanal", description: "Toda sexta-feira" },
    { icon: Zap, title: "Adiantamento", description: "Possibilidade de adiantamento" },
    { icon: DollarSign, title: "Baixo investimento inicial", description: "Comece com apenas $300 (primeiro tanque)" },
    { icon: Truck, title: "Van fornecida", description: "Não tem van? A TEX te fornece uma totalmente equipada" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            💵 Pagamentos rápidos e sem complicação
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 shadow-[var(--card-shadow)] hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform">
            <Link to="/cadastro">
              Cadastre-se Agora
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
