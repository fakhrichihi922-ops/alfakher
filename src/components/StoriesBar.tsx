import { useState } from "react";
import StoryViewer from "./StoryViewer";

interface Story {
  id: number;
  charityName: string;
  imageUrl: string;
}

interface StoriesBarProps {
  stories: Story[];
}

const StoriesBar = ({ stories }: StoriesBarProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-primary/80 to-primary/60 p-[2px] hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full border-2 border-background overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt={story.charityName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors max-w-[70px] truncate">
              {story.charityName}
            </span>
          </button>
        ))}
      </div>

      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
};

export default StoriesBar;
