import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import driverRoad from "@/assets/driver-road.jpg";

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ 
          backgroundImage: `url(${driverRoad})`,
          backgroundPosition: 'center center'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-background">
            Pronto para começar a ganhar dinheiro de verdade?
          </h2>
          
          <p className="text-lg md:text-xl mb-3 md:mb-4">
            Preencha o formulário e veja se você se encaixa no perfil.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <p className="text-base md:text-lg font-semibold text-background">
              As vagas são limitadas devido à alta demanda.
            </p>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
          >
            <Link to="/cadastro">
              👉 Quero me Cadastrar e Começar Hoje
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
