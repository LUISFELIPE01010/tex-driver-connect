import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/tex-logo.png";
import { useTranslation } from "@/contexts/TranslationContext";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={logo} alt="TEX Transportes" className="h-12 md:h-16" />
        </Link>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            {language === "pt" ? "EN" : "PT"} | {language === "pt" ? "PT" : "EN"}
          </button>
          
          {isHomePage && (
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/cadastro">{t.header.signUp}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
