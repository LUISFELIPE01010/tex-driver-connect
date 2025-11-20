import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import driverRoad from "@/assets/driver-road.jpg";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${driverRoad})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            📲 Pronto para começar a ganhar dinheiro de verdade?
          </h2>
          
          <p className="text-xl mb-4">
            Preencha o formulário e veja se você se encaixa no perfil.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-lg font-semibold text-primary">
              As vagas são limitadas devido à alta demanda.
            </p>
          </div>
          
          <Button asChild size="lg" className="text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform">
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
