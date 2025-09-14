import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ForumPostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorInitials: string;
  category: string;
  timestamp: string;
  likes: number;
  replies: number;
  isAnonymous?: boolean;
}

export default function ForumPost({
  id,
  title,
  content,
  author,
  authorInitials,
  category,
  timestamp,
  likes: initialLikes,
  replies,
  isAnonymous = false
}: ForumPostProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    console.log(`${isLiked ? 'Unliked' : 'Liked'} post: ${title}`);
  };

  const handleReply = () => {
    console.log(`Reply to post: ${title}`);
  };

  const handleShare = () => {
    console.log(`Share post: ${title}`);
  };

  const displayName = isAnonymous ? "Anonymous" : author;
  const displayInitials = isAnonymous ? "A" : authorInitials;

  return (
    <Card className="hover-elevate">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {displayInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{displayName}</span>
                {isAnonymous && (
                  <Badge variant="outline" className="text-xs">
                    Anonymous
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" data-testid={`button-more-${id}`}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2 leading-tight" data-testid={`title-post-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike}
              className={`gap-1 ${isLiked ? 'text-red-600' : ''}`}
              data-testid={`button-like-${id}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReply}
              className="gap-1"
              data-testid={`button-reply-${id}`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{replies}</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            data-testid={`button-share-${id}`}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}