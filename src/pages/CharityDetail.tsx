import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

const CHARITY_DETAILS: Record<string, any> = {
  "1": {
    name: "Hope For Everyone",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200",
    location: "New York, USA",
    description: "Hope For Everyone is dedicated to providing warm clothes, shelter, and hope to homeless families during harsh winter months. We believe everyone deserves warmth and dignity.",
    images: [
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    ],
    projects: [
      { title: "Winter Clothes Drive", goal: 10000, raised: 7500 },
      { title: "Emergency Shelter", goal: 25000, raised: 18000 },
    ],
    contact: { email: "contact@hopeforeveryone.org", phone: "+1 234 567 8900" },
  },
};

const CharityDetail = () => {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const charity = CHARITY_DETAILS[id || "1"];

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

  if (!charity) {
    return <div>Charity not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-fade-in">
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img src={charity.logo} alt={charity.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{charity.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  {charity.location}
                </div>
                <p className="text-muted-foreground">{charity.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {charity.images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${charity.name} ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Active Projects</h2>
            <div className="space-y-4 mb-8">
              {charity.projects.map((project: any, idx: number) => (
                <Card key={idx} className="p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(project.raised / project.goal) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ${project.raised.toLocaleString()} raised of ${project.goal.toLocaleString()} goal
                  </p>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {charity.contact.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                {charity.contact.phone}
              </div>
            </div>

            <Button className="w-full" size="lg">
              Donate Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CharityDetail;
