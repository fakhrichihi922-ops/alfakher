import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building2, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/feed" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AF</span>
            </div>
            <span className="font-semibold text-lg">AlFakher</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/feed" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Feed
            </Link>
            <Link to="/charities" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Building2 className="w-4 h-4" />
              Charities
            </Link>
            <Link to="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
