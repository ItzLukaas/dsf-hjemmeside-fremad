import { Link } from "react-router-dom";
import { Heart, Leaf, Users, Baby, Briefcase, Building2, ArrowRight, Handshake, Scale, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const Index = () => {
  const policies = [{
    title: "Velfærd og sundhed",
    icon: Heart
  }, {
    title: "Miljø og klima",
    icon: Leaf
  }, {
    title: "Ligestilling",
    icon: Users
  }, {
    title: "Børn og unge",
    icon: Baby
  }, {
    title: "Arbejdsmarked",
    icon: Briefcase
  }, {
    title: "Offentlig sektor",
    icon: Building2
  }, {
    title: "Fred og samarbejde",
    icon: Handshake
  }, {
    title: "Religion og politik",
    icon: Scale
  }, {
    title: "Udlændingepolitik",
    icon: Globe
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Et samfund, hvor alle<br />har en chance
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Det Socialistiske Forbund kæmper for et retfærdigt samfund med stærk velfærd, 
              lige muligheder og solidaritet for alle.
            </p>
          </div>

          {/* Valgkampsvideo */}
          <div className="max-w-5xl mx-auto mb-12 animate-fade-in-up">
            <Card className="overflow-hidden shadow-elegant hover:shadow-hover transition-all">
              <div className="relative aspect-video bg-muted">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/hoEoTtKliZc"
                  title="Det Socialistiske Forbund - Valgkampsvideo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/bliv-medlem">
              <Button className="bg-gradient-primary hover:shadow-hover transition-all text-lg px-8 py-6 group">
                Bliv medlem
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/maerkesager">
              <Button variant="outline" className="text-lg px-8 py-6 hover:bg-secondary">
                Læs om vores politik
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Hvem er vi?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Det Socialistiske Forbund er et politisk parti, der arbejder for et samfund 
            bygget på solidaritet, lighed og fællesskab. Vi tror på, at alle mennesker 
            fortjener en værdig tilværelse med adgang til sundhed, uddannelse og tryghed. 
            Gennem demokratisk deltagelse og fælles kamp ønsker vi at skabe 
            varig forandring i samfundet.
          </p>
        </div>
      </section>

      {/* Policies Overview */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vores mærkesager
            </h2>
            <p className="text-lg text-muted-foreground">
              Vi kæmper for et bedre samfund på flere områder
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto animate-fade-in-up">
            {policies.map((policy, index) => {
            const Icon = policy.icon;
            return <Card key={policy.title} className="p-6 text-center hover:shadow-hover transition-all duration-300 hover:scale-105 cursor-pointer group" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{policy.title}</h3>
                </Card>;
          })}
          </div>

          <div className="text-center mt-12">
            <Link to="/maerkesager">
              
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-primary text-primary-foreground shadow-elegant animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vil du gøre en forskel?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Sammen er vi stærkere. Bliv en del af bevægelsen for et mere retfærdigt samfund.
            </p>
            <Link to="/bliv-medlem">
              <Button size="lg" className="bg-background text-primary hover:bg-background/90 hover:scale-105 transition-all">
                Bliv medlem i dag
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;