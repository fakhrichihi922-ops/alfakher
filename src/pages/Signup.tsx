import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Heart, Building2, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"donor" | "charity" | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (selectedRole: "donor" | "charity") => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/feed`,
          data: {
            name: formData.name,
            role: role,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Welcome to AlFakher",
      });

      navigate("/feed");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold">AlFakher</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Join AlFakher</h1>
          <p className="text-muted-foreground">Start making a transparent impact</p>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6 animate-scale-in">
            <Card
              className="p-8 cursor-pointer hover:shadow-gold-lg hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
              onClick={() => handleRoleSelect("donor")}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm a Donor</h2>
                <p className="text-muted-foreground">
                  Donate to verified charities and track your impact with proof of every contribution
                </p>
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer hover:shadow-gold-lg hover:scale-105 transition-all duration-300 border-2 hover:border-primary"
              onClick={() => handleRoleSelect("charity")}
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">I'm a Charity</h2>
                <p className="text-muted-foreground">
                  Receive donations and build trust by sharing proof of your impactful work
                </p>
              </div>
            </Card>
          </div>
        )}

        {step === 2 && (
          <Card className="p-8 max-w-md mx-auto animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
              </p>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Signup;
