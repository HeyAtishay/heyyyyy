import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Send, Bot, User, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "crisis" | "normal";
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm MindCare AI, your mental health support companion. I'm here to listen and provide support 24/7. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mock AI responses based on keywords
  const generateResponse = (userMessage: string): { content: string; type?: "crisis" | "normal" } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    if (lowerMessage.includes("hurt") || lowerMessage.includes("die") || 
        lowerMessage.includes("suicide") || lowerMessage.includes("kill")) {
      return {
        content: "🚨 I'm concerned about what you've shared. You're not alone, and help is available. Please reach out to the National Suicide Prevention Lifeline at 988 or contact your campus counseling center immediately. Would you like me to help you find local crisis resources?",
        type: "crisis"
      };
    }
    
    // Anxiety responses
    if (lowerMessage.includes("anxious") || lowerMessage.includes("worry") || 
        lowerMessage.includes("panic") || lowerMessage.includes("stress")) {
      return {
        content: "I understand you're feeling anxious. That's a very common experience for students. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 6. Would you like me to guide you through some other coping strategies?"
      };
    }
    
    // Depression responses
    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || 
        lowerMessage.includes("lonely") || lowerMessage.includes("tired")) {
      return {
        content: "I hear that you're going through a difficult time. These feelings are valid, and it's brave of you to reach out. Remember that small steps count - have you been able to eat something today or get a bit of fresh air?"
      };
    }
    
    // Academic stress
    if (lowerMessage.includes("exam") || lowerMessage.includes("study") || 
        lowerMessage.includes("grade") || lowerMessage.includes("assignment")) {
      return {
        content: "Academic pressure can be overwhelming. Remember that your worth isn't defined by your grades. Let's break this down - what specific aspect of your studies is causing the most stress right now?"
      };
    }
    
    // General support
    return {
      content: "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling right now? Sometimes talking through our thoughts can help us process them better."
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "bot",
        timestamp: new Date(),
        type: response.type,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      console.log("AI response generated:", response);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          MindCare AI Assistant
          <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Online 24/7
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "crisis"
                      ? "bg-red-50 border-2 border-red-200 text-red-900"
                      : "bg-muted"
                  }`}
                  data-testid={`message-${message.sender}-${message.id}`}
                >
                  {message.type === "crisis" && (
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-semibold text-red-600">Crisis Support</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Share what's on your mind..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            data-testid="input-chat-message"
            className="flex-1"
          />
          <Button 
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This AI assistant provides support but is not a replacement for professional help.
        </p>
      </CardContent>
    </Card>
  );
}