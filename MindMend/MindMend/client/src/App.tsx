import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Assessment from "./pages/Assessment";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/community" component={Community} />
      <Route path="/resources" component={Resources} />
      <Route path="/assessment" component={Assessment} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Simple routing - in a real app you'd use proper routing
    const routes: Record<string, string> = {
      home: "/",
      dashboard: "/dashboard", 
      chat: "/chat",
      forum: "/community",
      resources: "/resources",
      assessment: "/assessment"
    };
    
    if (routes[page]) {
      window.history.pushState({}, '', routes[page]);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <NavigationBar 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
          />
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
