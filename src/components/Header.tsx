import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/tex-logo.png";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="TEX Transportes" className="h-10" />
        </Link>
        
        {isHomePage && (
          <Button asChild size="lg" className="shadow-lg">
            <Link to="/cadastro">Quero me Cadastrar</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
