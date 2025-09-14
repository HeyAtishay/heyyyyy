import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SmilePlus, Meh, Frown, Heart, Star } from "lucide-react";

interface MoodEntry {
  mood: string;
  intensity: number;
  note: string;
  date: string;
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(3);
  const [note, setNote] = useState<string>("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const moods = [
    { name: "Happy", icon: SmilePlus, color: "text-green-500" },
    { name: "Neutral", icon: Meh, color: "text-yellow-500" },
    { name: "Sad", icon: Frown, color: "text-blue-500" },
    { name: "Anxious", icon: Heart, color: "text-red-500" },
    { name: "Excited", icon: Star, color: "text-purple-500" },
  ];

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    const newEntry: MoodEntry = {
      mood: selectedMood,
      intensity,
      note,
      date: new Date().toLocaleDateString(),
    };
    
    setEntries([newEntry, ...entries]);
    setSelectedMood("");
    setIntensity(3);
    setNote("");
    console.log("Mood entry submitted:", newEntry);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Daily Mood Check-in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block">How are you feeling today?</label>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => {
                const Icon = mood.icon;
                return (
                  <Button
                    key={mood.name}
                    variant={selectedMood === mood.name ? "default" : "outline"}
                    className="h-16 flex-col gap-1"
                    onClick={() => {
                      setSelectedMood(mood.name);
                      console.log(`Selected mood: ${mood.name}`);
                    }}
                    data-testid={`button-mood-${mood.name.toLowerCase()}`}
                  >
                    <Icon className={`h-6 w-6 ${selectedMood === mood.name ? "text-primary-foreground" : mood.color}`} />
                    <span className="text-xs">{mood.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Intensity Scale */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Intensity Level: {intensity}/5
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <Button
                  key={level}
                  variant={intensity >= level ? "default" : "outline"}
                  size="sm"
                  className="w-12 h-12"
                  onClick={() => {
                    setIntensity(level);
                    console.log(`Intensity set to: ${level}`);
                  }}
                  data-testid={`button-intensity-${level}`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-3 block">Any thoughts or notes? (Optional)</label>
            <Textarea
              placeholder="What's on your mind today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px]"
              data-testid="textarea-mood-note"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!selectedMood}
            className="w-full"
            data-testid="button-submit-mood"
          >
            Save Mood Entry
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {entries.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{entry.mood}</span>
                    <span className="text-sm text-muted-foreground">
                      Intensity: {entry.intensity}/5
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}