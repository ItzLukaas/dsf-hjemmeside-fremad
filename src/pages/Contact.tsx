import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Besked sendt!",
      description: "Vi vender tilbage hurtigst muligt.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Kontakt os
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Har du spørgsmål eller vil du i kontakt med os? Vi er her for dig.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="space-y-6 animate-fade-in-up">
              <Card className="p-6 hover:shadow-hover transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-sm">kontakt@dsf.dk</p>
                <p className="text-muted-foreground text-sm">presse@dsf.dk</p>
              </Card>

              <Card className="p-6 hover:shadow-hover transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Telefon</h3>
                <p className="text-muted-foreground text-sm">+45 12 34 56 78</p>
                <p className="text-muted-foreground text-sm text-xs mt-1">
                  Man-Fre: 9:00-16:00
                </p>
              </Card>

              <Card className="p-6 hover:shadow-hover transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                <p className="text-muted-foreground text-sm">
                  Eksempelvej 123<br />
                  1234 København K<br />
                  Danmark
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send os en besked
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Navn *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dit navn"
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
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Emne *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Hvad drejer din henvendelse sig om?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Besked *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Skriv din besked her..."
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-hover transition-all group"
                  >
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send besked
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

export default Contact;
