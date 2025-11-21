import { Headphones, MapPin, BarChart3, Laptop, Target, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import supportImage from "@/assets/support-team.jpg";

const SupportSection = () => {
  const benefits = [
    { icon: Headphones, text: "Suporte 24h / 7 dias por semana" },
    { icon: Award, text: "Acesso às melhores cargas e contratos" },
    { icon: MapPin, text: "Gestão completa de rotas, agenda e performance" },
    { icon: Laptop, text: "Tecnologia para eliminar burocracias" },
    { icon: Target, text: "Acompanhamento diário para atingir suas metas" },
    { icon: BarChart3, text: "Mais performance = melhores contratos para todos" }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como a TEX te ajuda
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A TEX Transportes é mais que uma empresa — é uma parceira na sua jornada.
          </p>
        </div>

        <div className="mb-12 max-w-5xl mx-auto">
          <img 
            src={supportImage} 
            alt="Equipe de suporte TEX Transportes" 
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
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
            Aqui você não fica sozinho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
