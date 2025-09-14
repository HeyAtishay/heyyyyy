import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Calming_mountain_lake_scene_681f5990.png";

export default function HeroSection() {
  const handleGetStarted = () => {
    console.log("Get started clicked");
  };

  const handleLearnMore = () => {
    console.log("Learn more clicked");
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      {/* Hero Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your Mental Health,
            <span className="block text-4xl md:text-5xl text-blue-200">Our Priority</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital support system designed specifically for students in higher education. 
            24/7 AI assistance, peer support, and professional resources.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-300" />
            <span>24/7 AI Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-300" />
            <span>Peer Community</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-300" />
            <span>Crisis Intervention</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary/90 backdrop-blur-sm border-primary-border text-lg px-8 py-3"
            onClick={handleGetStarted}
            data-testid="button-get-started"
          >
            Get Started Today
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-background/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/10 text-lg px-8 py-3"
            onClick={handleLearnMore}
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        {/* Emergency notice */}
        <div className="bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm font-medium">
            🚨 Crisis Support: If you're in immediate danger, please call <strong>988</strong> or your local emergency services.
          </p>
        </div>
      </div>
    </section>
  );
}