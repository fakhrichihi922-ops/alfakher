import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import StoriesBar from "@/components/StoriesBar";
import PostCard from "@/components/PostCard";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const SAMPLE_STORIES = [
  { id: 1, charityName: "Hope For Everyone", imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400" },
  { id: 2, charityName: "Food Angels", imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400" },
  { id: 3, charityName: "Clean Water", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400" },
  { id: 4, charityName: "Education Now", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400" },
];

const SAMPLE_POSTS = [
  {
    id: 1,
    charityName: "Hope For Everyone",
    charityLogo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    caption: "Thanks to your donations, we distributed warm winter clothes to 50 families today! 🧥❤️",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    charityName: "Food Angels",
    charityLogo: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800",
    caption: "Meal distribution day! Your support helped us serve 200 hot meals to those in need 🍲",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    charityName: "Clean Water Initiative",
    charityLogo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800",
    caption: "New water filters installed in the village! Clean water for 100+ families 💧",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    charityName: "Education Now",
    charityLogo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    caption: "School supplies delivered! 30 children now have books and learning materials 📚✏️",
    timestamp: "2 days ago",
  },
  {
    id: 5,
    charityName: "Medical Aid",
    charityLogo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
    caption: "Free medical camp completed! We provided healthcare to 150 patients today 🏥",
    timestamp: "3 days ago",
  },
];

const Feed = () => {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />
      
      <div className="max-w-2xl mx-auto py-6 px-4">
        <StoriesBar stories={SAMPLE_STORIES} />
        
        <div className="space-y-6 mt-6">
          {SAMPLE_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
