import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Heart, Building2 } from "lucide-react";

const SAMPLE_DONATIONS = [
  {
    id: 1,
    amount: 50,
    charity: "Hope For Everyone",
    project: "Winter Clothes Drive",
    status: "Proof Available",
    proofImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
    proofDescription: "Your $50 donation helped purchase warm winter coats for 5 homeless children",
    date: "2024-01-15",
  },
  {
    id: 2,
    amount: 30,
    charity: "Food Angels",
    project: "Meals for Families",
    status: "Proof Available",
    proofImage: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=400",
    proofDescription: "Your $30 donation provided 20 hot meals to families in need",
    date: "2024-01-10",
  },
  {
    id: 3,
    amount: 20,
    charity: "Clean Water Initiative",
    project: "Water Filters",
    status: "Proof Available",
    proofImage: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=400",
    proofDescription: "Your $20 donation helped install a water filter for a family of 6",
    date: "2024-01-05",
  },
];

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const totalDonated = SAMPLE_DONATIONS.reduce((sum, d) => sum + d.amount, 0);
  const charitiesSupported = new Set(SAMPLE_DONATIONS.map(d => d.charity)).size;

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-8 animate-fade-in">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">{user?.user_metadata?.name || "Donor"}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-primary mb-1">${totalDonated}</p>
                <p className="text-sm text-muted-foreground">Total Donated</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-primary mb-1">{SAMPLE_DONATIONS.length}</p>
                <p className="text-sm text-muted-foreground">Donations Made</p>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-primary mb-1">{charitiesSupported}</p>
                <p className="text-sm text-muted-foreground">Charities Supported</p>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Donation History</h2>
          <div className="space-y-4">
            {SAMPLE_DONATIONS.map((donation) => (
              <Card key={donation.id} className="p-6 animate-slide-up hover:shadow-gold transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">${donation.amount} Donation</h3>
                    <p className="text-sm text-muted-foreground">{donation.charity}</p>
                    <p className="text-sm text-muted-foreground">{donation.project}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <Heart className="w-4 h-4 fill-current" />
                      {donation.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{donation.date}</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/proof/${donation.id}`)}
                  variant="outline"
                  size="sm"
                >
                  View Proof
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
