import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import vanInterior from "@/assets/van-interior.jpg";

const VanOptions = () => {
  const rentalIncludes = [
    "Geladeira",
    "Micro-ondas",
    "Inversor",
    "Bateria reserva",
    "Isolamento térmico",
    "Seguro",
    "Suporte de manutenção"
  ];

  const ownVanBenefits = [
    "Acesso a todos os brokers e contratantes",
    "Melhores preços",
    "Taxa fixa semanal (zero porcentagem)",
    "Modalidade avulsa por porcentagem (opcional)",
    "Suporte 24/7",
    "Prioridade de carga"
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Rental Option */}
          <Card className="p-8 shadow-[var(--card-shadow)]">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Não tem van? A TEX entrega uma pronta para trabalhar
            </h2>
            <div className="mb-6">
              <img src={vanInterior} alt="Interior da van equipada" className="rounded-lg w-full h-64 object-cover" />
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Aluguel por 12 meses com tudo incluído:
            </p>
            <ul className="space-y-3">
              {rentalIncludes.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold text-primary mt-8 text-center">
              Você dirige. A TEX cuida do resto.
            </p>
          </Card>

          {/* Own Van Option */}
          <Card className="p-8 shadow-[var(--card-shadow)] bg-secondary text-secondary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Já tem van? Ganhe mais com a TEX
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Traga sua própria van e aproveite vantagens exclusivas:
            </p>
            <ul className="space-y-3">
              {ownVanBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VanOptions;
