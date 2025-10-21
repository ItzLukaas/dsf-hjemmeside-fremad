import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gradient-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              
              <span className="font-bold text-lg">Det Socialistiske Forbund</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Et samfund, hvor alle har en chance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Hurtige links</h3>
            <ul className="space-y-2 text-sm">
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
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
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

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Det Socialistiske Forbund. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;