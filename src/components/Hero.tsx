import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-truck.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Trabalhe como Driver de Cargovan e fature de $10.000 a $16.000/mês
            <span className="block text-primary mt-2">com suporte completo da TEX Transportes</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            O mercado de transporte nunca para — e agora é sua oportunidade de entrar em um setor que cresce todos os anos. 
            Se você quer ganhar bem, reorganizar sua vida financeira e ter estabilidade, dirigir cargovan é hoje uma das formas 
            mais sólidas de alcançar isso nos Estados Unidos.
          </p>
          
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

export default Hero;
