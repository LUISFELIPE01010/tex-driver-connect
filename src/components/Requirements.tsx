import { Check, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const Requirements = () => {
  const requirements = [
    "Work Permit",
    "Driver License válida",
    "Disponibilidade para viajar",
    "Vontade de crescer rápido"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Requisitos para começar
            </h2>
          </div>

          <Card className="p-8 shadow-[var(--card-shadow)] mb-8">
            <ul className="grid md:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-foreground font-medium">{req}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-muted border-l-4 border-l-primary">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-foreground">
                  Nos primeiros 3 meses você opera como pessoa física.
                </p>
                <p className="text-lg text-foreground font-semibold">
                  Depois, a TEX te ajuda a abrir sua LLC/DBA sem complicação.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
