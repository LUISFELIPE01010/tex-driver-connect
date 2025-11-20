import { DollarSign, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const EarningsPotential = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            💰 Quanto você pode ganhar?
          </h2>
          <p className="text-xl text-muted-foreground">
            Motoristas da TEX Transportes faturam:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 shadow-[var(--card-shadow)] hover:shadow-xl transition-shadow">
            <div className="text-center">
              <h3 className="text-5xl font-bold text-primary mb-2">$10.000 - $12.000</h3>
              <p className="text-lg text-muted-foreground mb-4">por mês</p>
              <p className="text-foreground">Faixa comum de ganhos</p>
            </div>
          </Card>

          <Card className="p-8 shadow-[var(--card-shadow)] hover:shadow-xl transition-shadow border-2 border-primary">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-5xl font-bold text-primary mb-2">$14.000 - $16.000</h3>
              <p className="text-lg text-muted-foreground mb-4">por mês</p>
              <p className="text-foreground font-semibold">Quando aproveita cargas adicionais</p>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-lg text-foreground">
            Seus ganhos dependem do desempenho, número de milhas e disponibilidade.<br />
            <span className="font-bold text-primary">Quanto mais você roda, mais você ganha.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EarningsPotential;
