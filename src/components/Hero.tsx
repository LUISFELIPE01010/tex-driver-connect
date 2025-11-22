import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-van-road.jpg";
const Hero = () => {
  return <section className="relative min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 via-secondary/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Trabalhe como Driver de Cargovan</span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-primary mt-4 animate-pulse-slow drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              $10.000 a $16.000/mês
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-background/95 mt-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              com suporte completo da TEX Transportes
            </span>
          </h1>
            
          <div className="h-1 w-24 bg-primary my-6 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-background/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            O mercado de transporte <strong className="text-primary">nunca para</strong> — e agora é sua oportunidade de entrar em um setor que cresce todos os anos.
            Se você quer ganhar bem, reorganizar sua vida financeira e ter estabilidade, dirigir cargovan é hoje uma das formas 
            mais sólidas de alcançar isso nos Estados Unidos.
          </p>
          
          <Button asChild size="lg" className="text-lg px-10 py-7 shadow-2xl hover:scale-105 transition-all animate-bounce-subtle">
            <Link to="/cadastro">
              👉 Quero me Cadastrar e Começar Hoje
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;