import { Heart } from "lucide-react";
import { Card } from "./ui/card";

interface Post {
  id: number;
  charityName: string;
  charityLogo: string;
  image: string;
  caption: string;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="overflow-hidden animate-fade-in hover:shadow-lg transition-shadow">
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={post.charityLogo} alt={post.charityName} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-semibold text-sm">{post.charityName}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>

      <img src={post.image} alt="Post" className="w-full aspect-square object-cover" />

      <div className="p-4">
        <button className="mb-3 hover:scale-110 transition-transform">
          <Heart className="w-6 h-6 text-muted-foreground hover:text-primary" />
        </button>
        <p className="text-sm">
          <span className="font-semibold">{post.charityName}</span> {post.caption}
        </p>
      </div>
    </Card>
  );
};

export default PostCard;
