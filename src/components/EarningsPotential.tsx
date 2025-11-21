import { Link } from "react-router-dom";
import { DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EarningsPotential = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-subtle" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            💰 Quanto você pode ganhar?
          </h2>
        </div>

        <Card className="max-w-3xl mx-auto p-8 md:p-12 shadow-[var(--card-shadow)] bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in">
          <div className="text-center space-y-6">
            <TrendingUp className="w-16 h-16 text-primary mx-auto animate-bounce-subtle" />
            
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Motoristas da TEX Transportes faturam:
              </p>
              
              <div className="space-y-4">
                <div className="bg-background/50 p-6 rounded-lg hover:scale-105 transition-transform">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    $10.000 a $12.000/mês
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">(faixa comum)</p>
                </div>
                
                <div className="bg-background/50 p-6 rounded-lg hover:scale-105 transition-transform">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    $14.000 a $16.000/mês
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">(quando aproveita cargas adicionais)</p>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-foreground leading-relaxed">
              Seus ganhos dependem do desempenho, número de milhas e disponibilidade.
              <br />
              <span className="font-bold text-primary">Quanto mais você roda, mais você ganha.</span>
            </p>

            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform mt-6">
              <Link to="/cadastro">
                Comece Agora
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EarningsPotential;
