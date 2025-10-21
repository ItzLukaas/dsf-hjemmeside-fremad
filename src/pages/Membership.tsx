import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const Membership = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tak for din interesse!",
      description: "Vi kontakter dig hurtigst muligt.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const benefits = [
    "Vær med til at påvirke politikken",
    "Deltag i politiske møder og arrangementer",
    "Netværk med ligesindede",
    "Få nyhedsbrev og opdateringer",
    "Mulighed for at stille op til valg",
    "Stemme ved partiets landsmøde",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bliv medlem af DSF
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sammen kan vi skabe forandring. Tilmeld dig i dag og vær en del af bevægelsen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits */}
            <div className="animate-fade-in-up">
              <Card className="p-8 h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Fordele ved medlemskab
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-gradient-subtle rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Kontingent</h3>
                  <p className="text-sm text-muted-foreground">
                    Kontingentet er fleksibelt og baseret på din indkomst. 
                    Kontakt os for mere information.
                  </p>
                </div>
              </Card>
            </div>

            {/* Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Tilmeldingsformular
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Fulde navn *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dit fulde navn"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="din@email.dk"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+45 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Fortæl os hvorfor du vil være medlem
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hvad motiverer dig til at blive medlem?"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-hover transition-all">
                    Send tilmelding
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;
