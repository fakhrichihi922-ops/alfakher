import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/feed");
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">AlFakher</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button onClick={() => navigate("/signup")} className="shadow-gold">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-32">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Transparency in Every Donation
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Connect donors with verified charities. Track your impact with photo and video proof of every donation. Building trust, one contribution at a time.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/signup")} className="shadow-gold-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/charities")}>
                Explore Charities
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-gold transition-all animate-slide-up">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Charities</h3>
              <p className="text-sm text-muted-foreground">
                All charities are verified and vetted to ensure your donations reach the right hands
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-gold transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Full Transparency</h3>
              <p className="text-sm text-muted-foreground">
                See exactly how your money is used with photo and video proof from charities
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-gold transition-all animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Your Impact</h3>
              <p className="text-sm text-muted-foreground">
                Follow your donation journey and see the real-world impact you're making
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
