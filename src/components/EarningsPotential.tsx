import { Link } from "react-router-dom";
import { DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";

const EarningsPotential = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-subtle" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.earningsPotential.title}
          </h2>
        </div>

        <Card className="max-w-3xl mx-auto p-8 md:p-12 shadow-[var(--card-shadow)] bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-fade-in">
          <div className="text-center space-y-6">
            <TrendingUp className="w-16 h-16 text-primary mx-auto animate-bounce-subtle" />
            
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t.earningsPotential.subtitle}
              </p>
              
              <div className="space-y-4">
                <div className="bg-background/50 p-6 rounded-lg hover:scale-105 transition-transform">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {t.earningsPotential.common}
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">{t.earningsPotential.commonLabel}</p>
                </div>
                
                <div className="bg-background/50 p-6 rounded-lg hover:scale-105 transition-transform">
                  <p className="text-3xl md:text-4xl font-bold text-primary">
                    {t.earningsPotential.additional}
                  </p>
                  <p className="text-lg text-muted-foreground mt-2">{t.earningsPotential.additionalLabel}</p>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-foreground leading-relaxed">
              {t.earningsPotential.description}
              <br />
              <span className="font-bold text-primary">{t.earningsPotential.moreYouDrive}</span>
            </p>

            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform mt-6">
              <Link to="/cadastro">
                {t.earningsPotential.cta}
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
