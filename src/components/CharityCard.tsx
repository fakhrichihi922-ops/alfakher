import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

interface Charity {
  id: number;
  name: string;
  logo: string;
  location: string;
  description: string;
}

interface CharityCardProps {
  charity: Charity;
}

const CharityCard = ({ charity }: CharityCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6 hover:shadow-gold transition-all animate-fade-in">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img src={charity.logo} alt={charity.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{charity.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            {charity.location}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{charity.description}</p>
          <Button onClick={() => navigate(`/charities/${charity.id}`)} size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CharityCard;
