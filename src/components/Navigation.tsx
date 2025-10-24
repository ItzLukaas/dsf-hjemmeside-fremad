import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  const links = [{
    name: "Forside",
    path: "/"
  }, {
    name: "Partiprogram",
    path: "/partiprogram"
  }, {
    name: "Mærkesager",
    path: "/maerkesager"
  }, {
    name: "Bliv medlem",
    path: "/bliv-medlem"
  }, {
    name: "Kontakt",
    path: "/kontakt"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              Det Socialistiske Forbund
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => <Link key={link.path} to={link.path}>
                <Button variant={isActive(link.path) ? "default" : "ghost"} className="transition-all">
                  {link.name}
                </Button>
              </Link>)}
            {user && (
              <Link to="/profil">
                <Button variant={isActive("/profil") ? "default" : "ghost"} className="transition-all">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profil
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {links.map(link => <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button variant={isActive(link.path) ? "default" : "ghost"} className="w-full justify-start">
                    {link.name}
                  </Button>
                </Link>)}
              {user && (
                <Link to="/profil" onClick={() => setIsOpen(false)}>
                  <Button variant={isActive("/profil") ? "default" : "ghost"} className="w-full justify-start">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                </Link>
              )}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;