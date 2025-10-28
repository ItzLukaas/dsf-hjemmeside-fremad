import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gradient-primary text-primary-foreground mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              
              <span className="font-bold text-base sm:text-lg">Det Socialistiske Forbund</span>
            </div>
            <p className="text-primary-foreground/80 text-xs sm:text-sm">
              Et samfund, hvor alle har en chance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Hurtige links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Forside
                </Link>
              </li>
              <li>
                <Link to="/maerkesager" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mærkesager
                </Link>
              </li>
              <li>
                <Link to="/bliv-medlem" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bliv medlem
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Kontakt</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/80">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>kontakt@dsf.dk</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+45 12 34 56 78</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>København, Danmark</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Det Socialistiske Forbund. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;