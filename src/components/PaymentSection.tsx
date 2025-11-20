import { Calendar, Zap, DollarSign, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";

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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 shadow-[var(--card-shadow)] hover:shadow-xl transition-shadow">
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
