
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Brain, LayoutDashboard, LifeBuoy, Menu, Settings, Sparkles, Map } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const links = [
    { name: "Home", path: "/", icon: LifeBuoy },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Therapy", path: "/therapy", icon: Brain },
    { name: "Journey", path: "/journey", icon: Map },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
                ${scrolled ? "glass-morphism" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500 animate-pulse-glow" />
            <span className="font-medium text-xl text-gradient">Serenity</span>
          </div>
        </div>
        
        {!isMobile ? (
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "default" : "ghost"}
                className={`gap-2 transition-all duration-300 ${
                  isActive(link.path) 
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md" 
                    : "hover:bg-amber-100/20 hover:backdrop-blur-sm"
                }`}
                onClick={() => navigate(link.path)}
              >
                <link.icon className={`h-4 w-4 ${isActive(link.path) ? "text-white" : "text-amber-600"}`} />
                <span>{link.name}</span>
              </Button>
            ))}
          </nav>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-20 text-amber-600"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 neo-blur z-10 animate-fade-in">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link) => (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="lg"
                  className={`gap-3 transition-all duration-300 ${
                    isActive(link.path) 
                      ? "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md button-glow" 
                      : "text-white hover:text-amber-500 hover:bg-white/10"
                  }`}
                  onClick={() => navigate(link.path)}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="text-lg">{link.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
