import { Heart, Leaf, Users, Baby, Briefcase, Building2, Handshake, Scale, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PolicyCard from "@/components/PolicyCard";

const policies = [
  {
    title: "Velfærd og sundhed",
    description: "Vi kæmper for et stærkt offentligt sundhedssystem, hvor alle har ret til gratis og kvalitetsbehandling. Sundhed er en menneskeret, ikke et privilegium.",
    icon: Heart,
  },
  {
    title: "Miljø og klima",
    description: "Klimakrisen kræver handling nu. Vi arbejder for grøn omstilling, bæredygtig energi og et miljø, som kommende generationer kan leve i.",
    icon: Leaf,
  },
  {
    title: "Ligestilling",
    description: "Alle mennesker fortjener lige muligheder uanset køn, etnicitet eller baggrund. Vi kæmper for et retfærdigt samfund for alle.",
    icon: Users,
  },
  {
    title: "Børn og unge",
    description: "Børn og unge skal have de bedste betingelser for at vokse op. Det betyder kvalitet i dagtilbud, skoler og uddannelser.",
    icon: Baby,
  },
  {
    title: "Arbejdsmarked og rettigheder",
    description: "Alle har ret til ordentlige arbejdsforhold, fair løn og stærke fagforeninger. Vi står vagt om arbejdstagernes rettigheder.",
    icon: Briefcase,
  },
  {
    title: "Offentlig sektor",
    description: "En stærk offentlig sektor er fundamentet for velfærdssamfundet. Vi vil stoppe nedskæringer og investere i vores fælles service.",
    icon: Building2,
  },
  {
    title: "Fred og internationalt samarbejde",
    description: "Vi prioriterer fred og internationalt samarbejde frem for militær oprustning. Dialog og diplomati er vejen til en mere sikker verden.",
    icon: Handshake,
  },
  {
    title: "Religion og politik",
    description: "Vi kæmper for adskillelse af religion og politik med fuld respekt for alles trosfrihed. Religion er en privat sag, og politik skal være sekulær.",
    icon: Scale,
  },
  {
    title: "Human udlændingepolitik",
    description: "Vi arbejder for en human udlændingepolitik med fokus på integration, fællesskab og lige muligheder for alle, der kommer til Danmark.",
    icon: Globe,
  },
];

const Policies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vores mærkesager
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Det er disse værdier og politikker, vi kæmper for hver eneste dag
            </p>
          </div>

          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {policies.map((policy, index) => (
              <PolicyCard
                key={policy.title}
                {...policy}
                delay={index * 100}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-gradient-subtle rounded-2xl p-12 shadow-elegant animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Vil du være med til at gøre en forskel?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bliv medlem af DSF og vær med til at skabe et mere retfærdigt samfund
            </p>
            <a href="/bliv-medlem">
              <button className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-hover transition-all duration-300 hover:scale-105">
                Bliv medlem nu
              </button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Policies;
