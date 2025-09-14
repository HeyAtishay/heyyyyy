import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, BookOpen, Video, Headphones } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  type: "article" | "video" | "audio" | "tool";
  category: string;
  readTime: string;
  url?: string;
}

const typeIcons = {
  article: BookOpen,
  video: Video,
  audio: Headphones,
  tool: ExternalLink,
};

const typeColors = {
  article: "bg-blue-100 text-blue-800",
  video: "bg-red-100 text-red-800",
  audio: "bg-green-100 text-green-800",
  tool: "bg-purple-100 text-purple-800",
};

export default function ResourceCard({ 
  title, 
  description, 
  type, 
  category, 
  readTime, 
  url 
}: ResourceCardProps) {
  const Icon = typeIcons[type];
  
  const handleAccess = () => {
    console.log(`Accessing resource: ${title}`);
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className={typeColors[type]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight" data-testid={`title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleAccess}
            data-testid={`button-access-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="gap-1"
          >
            Access <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}