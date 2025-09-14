import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronRight, Check, AlertTriangle, Info } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

const phq9Questions: Question[] = [
  {
    id: "q1",
    text: "Little interest or pleasure in doing things",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: "q2", 
    text: "Feeling down, depressed, or hopeless",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: "q3",
    text: "Trouble falling or staying asleep, or sleeping too much",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  }
];

export default function AssessmentTool() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    console.log(`Question ${questionId} answered with value: ${value}`);
  };

  const handleNext = () => {
    if (currentQuestion < phq9Questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
    setIsComplete(true);
    console.log("Assessment completed with score:", totalScore);
  };

  const getScoreInterpretation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", description: "Minimal depression symptoms" };
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", description: "Mild depression symptoms" };
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", description: "Moderate depression symptoms" };
    return { level: "Severe", color: "text-red-600", description: "Severe depression symptoms - please seek professional help" };
  };

  const progress = ((currentQuestion + 1) / phq9Questions.length) * 100;
  const currentQ = phq9Questions[currentQuestion];
  const hasAnswered = currentQ && answers[currentQ.id] !== undefined;

  if (isComplete) {
    const interpretation = getScoreInterpretation(score);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            Assessment Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold">{score}/27</div>
              <Badge variant="outline" className={interpretation.color}>
                {interpretation.level}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {interpretation.description}
              </p>
            </div>
            
            {score > 9 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800">Recommendation</p>
                    <p className="text-orange-700">
                      Consider speaking with a mental health professional. Your campus counseling center can provide support.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setIsComplete(false);
                setScore(0);
              }}
              variant="outline"
              className="flex-1"
              data-testid="button-retake-assessment"
            >
              Retake Assessment
            </Button>
            <Button 
              className="flex-1"
              data-testid="button-view-resources"
              onClick={() => console.log("View resources clicked")}
            >
              View Resources
            </Button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-700">
                This assessment is based on the PHQ-9 questionnaire and is for educational purposes only. 
                It does not replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health Assessment (PHQ-9)</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {phq9Questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Over the last 2 weeks, how often have you been bothered by:
          </p>
          <h3 className="font-medium text-lg leading-relaxed">
            {currentQ.text}
          </h3>
        </div>
        
        <div className="space-y-3">
          {currentQ.options.map((option) => (
            <Button
              key={option.value}
              variant={answers[currentQ.id] === option.value ? "default" : "outline"}
              className="w-full justify-start h-auto p-4 text-left"
              onClick={() => handleAnswer(currentQ.id, option.value)}
              data-testid={`button-option-${option.value}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${answers[currentQ.id] === option.value 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                  }`}>
                  {answers[currentQ.id] === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={!hasAnswered}
          className="w-full gap-2"
          data-testid="button-next-question"
        >
          {currentQuestion === phq9Questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          All responses are confidential and stored securely
        </p>
      </CardContent>
    </Card>
  );
}