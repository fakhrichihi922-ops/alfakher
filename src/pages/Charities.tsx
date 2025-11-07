import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import CharityCard from "@/components/CharityCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SAMPLE_CHARITIES = [
  {
    id: 1,
    name: "Hope For Everyone",
    logo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200",
    location: "New York, USA",
    description: "Providing warm clothes and shelter for homeless families during winter",
  },
  {
    id: 2,
    name: "Food Angels",
    logo: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=200",
    location: "Los Angeles, USA",
    description: "Fighting hunger by distributing fresh meals to communities in need",
  },
  {
    id: 3,
    name: "Clean Water Initiative",
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200",
    location: "Kenya",
    description: "Installing water filters and wells in rural villages for clean drinking water",
  },
  {
    id: 4,
    name: "Education Now",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200",
    location: "India",
    description: "Providing school supplies and education resources to underprivileged children",
  },
  {
    id: 5,
    name: "Medical Aid",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200",
    location: "Philippines",
    description: "Offering free medical camps and healthcare services in remote areas",
  },
  {
    id: 6,
    name: "Green Earth",
    logo: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200",
    location: "Brazil",
    description: "Reforestation projects and environmental conservation efforts",
  },
];

const Charities = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const filteredCharities = SAMPLE_CHARITIES.filter(
    (charity) =>
      charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Verified Charities</h1>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredCharities.map((charity) => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charities;
