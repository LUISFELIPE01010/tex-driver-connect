import { Link } from "react-router-dom";
import logo from "@/assets/tex-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TEX Transportes" className="h-8" />
            <p className="text-sm opacity-80">© TEX Transportes. Todos os direitos reservados.</p>
          </div>
          
          <Link 
            to="/admin-respostas" 
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
