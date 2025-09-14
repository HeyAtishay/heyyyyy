import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MessageCircle, 
  Heart, 
  Users, 
  BookOpen, 
  AlertTriangle,
  User,
  Menu
} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavigationBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function NavigationBar({ currentPage, onPageChange }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: Heart },
    { id: "chat", label: "AI Chat", icon: MessageCircle, hasNotification: true },
    { id: "forum", label: "Community", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "assessment", label: "Assessment", icon: AlertTriangle },
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
    console.log(`Navigated to: ${pageId}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-card border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MindCare</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => handleNavClick(item.id)}
                    className="relative gap-2 px-4"
                    data-testid={`nav-${item.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.hasNotification && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                        1
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon"
                data-testid="button-profile"
                onClick={() => console.log("Profile clicked")}
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="bg-card border-b border-card-border">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MindCare</span>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-64 bg-card border-l border-card-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleMobileMenu}
                  data-testid="button-close-mobile-menu"
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => handleNavClick(item.id)}
                      className="w-full justify-start gap-3 relative"
                      data-testid={`mobile-nav-${item.id}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {item.hasNotification && (
                        <Badge className="ml-auto h-5 w-5 p-0 text-xs">
                          1
                        </Badge>
                      )}
                    </Button>
                  );
                })}
                
                <hr className="my-4" />
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3"
                  onClick={() => console.log("Profile clicked")}
                  data-testid="mobile-nav-profile"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}