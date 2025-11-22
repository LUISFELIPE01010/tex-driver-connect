import { TrendingUp } from "lucide-react";

const MarketIntro = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(253,94,2,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-primary animate-pulse" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
              Por que agora é o momento ideal?
            </h2>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-6 md:p-10 shadow-xl animate-scale-in">
            <p className="text-lg md:text-2xl lg:text-3xl text-foreground leading-relaxed text-center font-medium">
              O mercado de transporte <strong className="text-primary font-bold">nunca para</strong> — e agora é sua oportunidade de
              entrar em um setor que cresce todos os anos. Se você quer ganhar bem, reorganizar sua vida financeira e ter
              estabilidade, dirigir cargovan é hoje uma das formas mais sólidas de alcançar isso nos Estados Unidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketIntro;
