import { X } from "lucide-react";
import { Button } from "./ui/button";

interface Story {
  id: number;
  charityName: string;
  imageUrl: string;
}

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

const StoryViewer = ({ story, onClose }: StoryViewerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:bg-white/20"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="max-w-md w-full mx-4 animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={story.imageUrl} alt={story.charityName} className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-semibold">{story.charityName}</span>
        </div>

        <div className="aspect-[9/16] rounded-lg overflow-hidden">
          <img
            src={story.imageUrl}
            alt={story.charityName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
