import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PROOF_DATA: Record<string, any> = {
  "1": {
    amount: 50,
    charity: "Hope For Everyone",
    project: "Winter Clothes Drive",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    description: "Your $50 donation helped purchase warm winter coats for 5 homeless children. The clothes were distributed on January 15, 2024, at our New York shelter.",
    date: "January 15, 2024",
  },
  "2": {
    amount: 30,
    charity: "Food Angels",
    project: "Meals for Families",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800",
    description: "Your $30 donation provided 20 hot, nutritious meals to families experiencing food insecurity. Meals were prepared and served on January 10, 2024.",
    date: "January 10, 2024",
  },
  "3": {
    amount: 20,
    charity: "Clean Water Initiative",
    project: "Water Filters",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800",
    description: "Your $20 donation helped install a ceramic water filter for a family of 6 in rural Kenya, providing them with clean drinking water for years to come.",
    date: "January 5, 2024",
  },
};

const ProofViewer = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const proof = PROOF_DATA[id || "1"];

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
      }
    };

    getSession();
  }, [navigate]);

  if (!proof) {
    return <div>Proof not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/profile")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <Card className="p-8 animate-fade-in">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Donation Proof</h1>
              <p className="text-lg text-muted-foreground">
                ${proof.amount} to {proof.charity}
              </p>
              <p className="text-sm text-muted-foreground">{proof.project}</p>
            </div>

            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={proof.image}
                alt="Proof of donation impact"
                className="w-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Impact Description</h2>
                <p className="text-muted-foreground">{proof.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Date</h3>
                <p className="text-muted-foreground">{proof.date}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  This proof was submitted by {proof.charity} to show the impact of your generous donation.
                  Thank you for making a difference!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProofViewer;
