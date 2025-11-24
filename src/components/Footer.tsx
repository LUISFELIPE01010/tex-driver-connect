import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/tex-logo.png";
import { useTranslation } from "@/contexts/TranslationContext";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="TEX Transportes" className="h-8" />
            <p className="text-sm opacity-80">{t.footer.rights}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/textransports?igsh=MWh5Y2hqNTRteTF0cg%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @textransports
            </a>
            
            <Link 
              to="/admin-respostas" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t.footer.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
