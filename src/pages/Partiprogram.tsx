import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Users, Leaf, Scale, Globe, Sparkles } from "lucide-react";
const values = [{
  icon: Scale,
  title: "Lighed",
  description: "Et samfund hvor alle har lige muligheder uanset baggrund"
}, {
  icon: Heart,
  title: "Tryghed",
  description: "Sikkerhed og velfærd for alle borgere gennem hele livet"
}, {
  icon: Users,
  title: "Fællesskab",
  description: "Sammen skaber vi et stærkere og mere retfærdigt samfund"
}, {
  icon: Leaf,
  title: "Miljøansvar",
  description: "Beskyttelse af vores planet for kommende generationer"
}, {
  icon: Globe,
  title: "Menneskerettigheder",
  description: "Fundamentale rettigheder og værdighed for alle"
}, {
  icon: Sparkles,
  title: "Mulighed",
  description: "Alle får chancen for at leve et godt og meningsfuldt liv"
}];
const Partiprogram = () => {
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
              Et samfund bygget på <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                lighed, tryghed og fællesskab
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Det Socialistiske Forbund kæmper for et samfund, hvor alle får mulighed 
              for at leve et godt liv, og hvor samfundet tager ansvar for både mennesker og miljø.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
            <div className="bg-gradient-subtle rounded-2xl p-5 sm:p-6 md:p-8 lg:p-12 shadow-elegant border border-border animate-fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Vores Vision
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                Vi arbejder for et Danmark, hvor solidaritet og fællesskab er grundlaget 
                for vores samfund. Et land hvor ingen bliver ladt i stikken, og hvor alle 
                bidrager efter evne og får efter behov.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Gennem demokratisk deltagelse og stærke fælles institutioner sikrer vi, 
                at magten ligger hos folket – ikke hos kapitalens interesser.
              </p>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-8 sm:mb-10 md:mb-12">
              Vores Grundværdier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in-up">
              {values.map((value, index) => <div key={value.title} className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:shadow-hover transition-all duration-300 hover:-translate-y-1" style={{
              animationDelay: `${index * 100}ms`
            }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-elegant">
                      <value.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Key Principles */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">
              Vores Principper
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Økonomisk retfærdighed
                </h3>
                <p className="text-muted-foreground">
                  Vi kæmper for fair fordeling af samfundets ressourcer gennem 
                  progressiv beskatning og stærk offentlig velfærd.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Demokratisk kontrol
                </h3>
                <p className="text-muted-foreground">
                  Øget demokrati på arbejdspladser og i samfundet generelt. 
                  Borgerne skal have reel indflydelse på beslutninger, der påvirker deres liv.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Bæredygtig fremtid
                </h3>
                <p className="text-muted-foreground">
                  Klimakrisen kræver radikal handling. Vi arbejder for grøn omstilling 
                  med sociale hensyn i centrum.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  International solidaritet
                </h3>
                <p className="text-muted-foreground">
                  Vi står sammen med progressive kræfter globalt for fred, retfærdighed 
                  og menneskerettigheder.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-subtle rounded-2xl p-6 sm:p-8 md:p-12 shadow-elegant animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Vil du være med til at realisere denne vision?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Sammen kan vi skabe et mere retfærdigt samfund for alle
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a href="/bliv-medlem" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:shadow-hover transition-all duration-300 hover:scale-105">
                  Bliv medlem nu
                </Button>
              </a>
              <a href="/maerkesager" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-secondary transition-all">
                  Læs om vores mærkesager
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Partiprogram;