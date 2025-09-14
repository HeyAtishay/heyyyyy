import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MessageCircle, MapPin, ExternalLink } from "lucide-react";

interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
  type: "hotline" | "text" | "chat" | "local";
}

const crisisResources: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "Free and confidential emotional support for people in suicidal crisis or emotional distress",
    available: "24/7",
    type: "hotline"
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 text support for those in crisis",
    available: "24/7",
    type: "text"
  },
  {
    name: "Campus Counseling Center",
    phone: "(555) 123-4567",
    description: "On-campus mental health services and emergency support",
    available: "Mon-Fri 8AM-5PM",
    type: "local"
  }
];

export default function CrisisAlert() {
  const handleCall = (phone: string) => {
    console.log(`Calling: ${phone}`);
    // In a real app, this would initiate a phone call
    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
  };

  const handleEmergency = () => {
    console.log("Emergency services contacted");
    window.location.href = "tel:911";
  };

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-6 w-6" />
          Crisis Support Resources
        </CardTitle>
        <p className="text-sm text-red-700">
          If you're having thoughts of self-harm or suicide, please reach out for help immediately. You are not alone.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Emergency Button */}
        <div className="bg-red-600 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Immediate Danger?</h3>
              <p className="text-sm text-red-100">Call emergency services right now</p>
            </div>
            <Button 
              onClick={handleEmergency}
              variant="secondary"
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50"
              data-testid="button-emergency-911"
            >
              Call 911
            </Button>
          </div>
        </div>

        {/* Crisis Resources */}
        <div className="space-y-3">
          {crisisResources.map((resource, index) => (
            <Card key={index} className="border-red-100">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-red-800">{resource.name}</h4>
                      {resource.type === "hotline" && <Phone className="h-4 w-4 text-red-600" />}
                      {resource.type === "text" && <MessageCircle className="h-4 w-4 text-red-600" />}
                      {resource.type === "local" && <MapPin className="h-4 w-4 text-red-600" />}
                    </div>
                    <p className="text-sm text-red-700 mb-1">{resource.description}</p>
                    <p className="text-xs text-red-600">Available: {resource.available}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono text-sm font-semibold text-red-800 mb-2">
                      {resource.phone}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleCall(resource.phone)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      data-testid={`button-call-${resource.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg p-4 border border-red-200">
          <h4 className="font-medium text-red-800 mb-3">Additional Support</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => console.log("Safety plan accessed")}
              data-testid="button-safety-plan"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Create Safety Plan
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => console.log("Local resources accessed")}
              data-testid="button-local-resources"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Find Local Resources
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700 text-center">
            Remember: Crisis support is available 24/7. You deserve help and support. Reaching out is a sign of strength, not weakness.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}