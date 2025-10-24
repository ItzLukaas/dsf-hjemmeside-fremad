import { useState, useEffect } from "react";
import { Check, Vote, LogOut, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

const Membership = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Check if user has voted
        const { data: voteData } = await supabase
          .from("votes")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        setHasVoted(!!voteData);

        // Get user profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        setProfile(profileData);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  const handleVote = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setVoting(true);
    try {
      const { error } = await supabase
        .from("votes")
        .insert({ user_id: user.id });

      if (error) throw error;

      setHasVoted(true);
      toast({
        title: "Tak for din stemme!",
        description: "Din stemme er nu registreret.",
      });
    } catch (error: any) {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const benefits = [
    "Direkte indflydelse på partiets politik",
    "Mulighed for at stille op til valg",
    "Adgang til eksklusive medlemsarrangementer",
    "Netværk med ligesindede",
    "Modtag nyhedsbrev og opdateringer"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-xl text-muted-foreground">Indlæser...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Bliv Medlem og Stem
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {user 
              ? "Vær med til at skabe forandring - stem på partiet i dag!"
              : "Log ind eller opret en bruger for at blive medlem og stemme"
            }
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {!user ? (
            // Not logged in
            <div className="max-w-2xl mx-auto">
              <Card className="animate-fade-in">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Log ind for at stemme</CardTitle>
                  <CardDescription>
                    Du skal være logget ind for at kunne stemme på partiet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate("/auth")}
                  >
                    Gå til login
                  </Button>
                  <div className="pt-4">
                    <h3 className="font-semibold mb-3">Fordele ved medlemskab:</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Logged in
            <div className="grid md:grid-cols-2 gap-8">
              {/* User Info Card */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Velkommen, {profile?.full_name || user.email}!</CardTitle>
                  <CardDescription>
                    Du er nu logget ind som medlem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">{profile?.email || user.email}</p>
                  </div>
                  {profile?.phone && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log ud
                  </Button>
                </CardContent>
              </Card>

              {/* Voting Card */}
              <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-6 w-6 text-primary" />
                    Stem på Partiet
                  </CardTitle>
                  <CardDescription>
                    {hasVoted 
                      ? "Du har allerede stemt - tak for din støtte!"
                      : "Vis din støtte ved at stemme på os"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasVoted ? (
                    <div className="text-center py-8 space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-scale-in" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Tak for din stemme!</h3>
                        <p className="text-muted-foreground">
                          Din stemme er registreret og betyder meget for os.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 py-4">
                        <p className="text-center text-muted-foreground">
                          Ved at stemme viser du din støtte til vores vision om et mere retfærdigt og bæredygtigt Danmark.
                        </p>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handleVote}
                        disabled={voting}
                      >
                        <Vote className="mr-2 h-5 w-5" />
                        {voting ? "Stemmer..." : "Stem på os nu"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Membership;
