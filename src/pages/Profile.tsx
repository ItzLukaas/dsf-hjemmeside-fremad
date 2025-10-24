import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Instagram, Linkedin, LogOut, Save, Trash2, Vote, UserCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  bio: string | null;
  avatar_url: string | null;
}

interface SocialConnection {
  id: string;
  platform: string;
  connected_at: string;
}

interface Vote {
  id: string;
  voted_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([]);
  const [vote, setVote] = useState<Vote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const [profileResponse, connectionsResponse, voteResponse] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("social_connections").select("*").eq("user_id", user.id),
        supabase.from("votes").select("*").eq("user_id", user.id).maybeSingle(),
      ]);

      if (profileResponse.data) setProfile(profileResponse.data);
      if (connectionsResponse.data) setSocialConnections(connectionsResponse.data);
      if (voteResponse.data) setVote(voteResponse.data);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          postal_code: profile.postal_code,
          bio: profile.bio,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profil opdateret",
        description: "Dine oplysninger er blevet gemt.",
      });
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved opdatering af profilen.",
        variant: "destructive",
      });
    }
  };

  const handleConnectSocial = async (platform: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("social_connections")
        .insert({ user_id: user.id, platform });

      if (error) throw error;

      toast({
        title: "Forbindelse oprettet",
        description: `Din ${platform} konto er nu forbundet.`,
      });
      loadUserData();
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke oprette forbindelse.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnectSocial = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from("social_connections")
        .delete()
        .eq("id", connectionId);

      if (error) throw error;

      toast({
        title: "Forbindelse fjernet",
        description: "Kontoen er blevet frakoblet.",
      });
      loadUserData();
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke fjerne forbindelse.",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawVote = async () => {
    if (!user || !vote) return;

    try {
      const { error } = await supabase.from("votes").delete().eq("id", vote.id);

      if (error) throw error;

      toast({
        title: "Stemme trukket tilbage",
        description: "Din stemme er blevet slettet.",
      });
      setVote(null);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke trække stemme tilbage.",
        variant: "destructive",
      });
    }
  };

  const handleVote = async () => {
    if (!user || vote) return;

    try {
      const { data, error } = await supabase
        .from("votes")
        .insert({ user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Stemme registreret",
        description: "Din stemme er blevet registreret.",
      });
      setVote(data);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke registrere stemme.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isConnected = (platform: string) => {
    return socialConnections.some((conn) => conn.platform === platform);
  };

  const getConnectionId = (platform: string) => {
    return socialConnections.find((conn) => conn.platform === platform)?.id;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="animate-pulse">Indlæser...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary">Min Profil</h1>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log ud
            </Button>
          </div>

          <Tabs defaultValue="account" className="animate-fade-in">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Kontooplysninger</TabsTrigger>
              <TabsTrigger value="voting">Afstemning</TabsTrigger>
              <TabsTrigger value="social">Sociale forbindelser</TabsTrigger>
              <TabsTrigger value="settings">Indstillinger</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kontooplysninger</CardTitle>
                  <CardDescription>
                    Opdater dine personlige oplysninger her
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Fulde navn</Label>
                        <Input
                          id="fullName"
                          value={profile?.full_name || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, full_name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile?.phone || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          value={profile?.address || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, address: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">By</Label>
                        <Input
                          id="city"
                          value={profile?.city || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postnummer</Label>
                        <Input
                          id="postalCode"
                          value={profile?.postal_code || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, postal_code: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Fortæl lidt om dig selv..."
                        value={profile?.bio || ""}
                        onChange={(e) =>
                          setProfile({ ...profile!, bio: e.target.value })
                        }
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Gem ændringer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voting" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Afstemning</CardTitle>
                  <CardDescription>
                    Administrer din stemme til partiet
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vote ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Vote className="h-5 w-5 text-primary" />
                          <p className="font-semibold">Du har stemt!</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Stemt den: {new Date(vote.voted_at).toLocaleDateString("da-DK")}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Træk stemme tilbage
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Dette vil slette din stemme permanent. Du kan stemme igen senere.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuller</AlertDialogCancel>
                            <AlertDialogAction onClick={handleWithdrawVote}>
                              Træk tilbage
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Du har ikke stemt endnu. Stem på partiet for at støtte vores vision!
                      </p>
                      <Button onClick={handleVote} className="w-full">
                        <Vote className="mr-2 h-4 w-4" />
                        Stem på partiet
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sociale forbindelser</CardTitle>
                  <CardDescription>
                    Forbind dine sociale mediekonti
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      { name: "Facebook", icon: Facebook, color: "text-blue-600" },
                      { name: "Twitter", icon: Twitter, color: "text-sky-500" },
                      { name: "Instagram", icon: Instagram, color: "text-pink-600" },
                      { name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
                    ].map(({ name, icon: Icon, color }) => (
                      <div
                        key={name}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-6 w-6 ${color}`} />
                          <span className="font-medium">{name}</span>
                        </div>
                        {isConnected(name) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleDisconnectSocial(getConnectionId(name)!)
                            }
                          >
                            Afbryd
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleConnectSocial(name)}
                          >
                            Forbind
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kontoindstillinger</CardTitle>
                  <CardDescription>
                    Administrer dine kontoindstillinger og præferencer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">E-mail notifikationer</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Modtag opdateringer om partiets aktiviteter
                      </p>
                      <Button variant="outline" size="sm">
                        Administrer præferencer
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Privatlivs indstillinger</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Kontroller hvem der kan se din profil
                      </p>
                      <Button variant="outline" size="sm">
                        Rediger privatliv
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Skift adgangskode</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Opdater din adgangskode for at sikre din konto
                      </p>
                      <Button variant="outline" size="sm">
                        Skift adgangskode
                      </Button>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="p-4 border border-destructive/50 rounded-lg">
                          <h3 className="font-semibold text-destructive mb-2">
                            Slet konto
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Permanent slet din konto og alle data
                          </p>
                          <Button variant="destructive" size="sm">
                            Slet konto
                          </Button>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Er du helt sikker?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Denne handling kan ikke fortrydes. Dette vil permanent slette
                            din konto og fjerne alle dine data fra vores servere.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuller</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive">
                            Ja, slet min konto
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
