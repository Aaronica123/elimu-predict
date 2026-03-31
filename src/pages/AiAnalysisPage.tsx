import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, Lightbulb } from "lucide-react";

const MOCK_ANALYSIS = [
  {
    student: "Brian Otieno",
    admissionNo: "ADM2024001",
    subject: "Mathematics",
    riskPercentage: 82,
    riskLevel: "HIGH" as const,
    suggestion: "1. Practice 10 algebra problems daily focusing on quadratic equations. 2. Join after-school math remedial sessions. 3. Use visual aids and Khan Academy videos for geometry concepts.",
  },
  {
    student: "Faith Wambui",
    admissionNo: "ADM2024002",
    subject: "Physics",
    riskPercentage: 74,
    riskLevel: "HIGH" as const,
    suggestion: "1. Focus on understanding force diagrams before solving problems. 2. Perform practical experiments at home with simple materials. 3. Form a study group to discuss concepts weekly.",
  },
  {
    student: "Dennis Njoroge",
    admissionNo: "ADM2024003",
    subject: "Chemistry",
    riskPercentage: 55,
    riskLevel: "MEDIUM" as const,
    suggestion: "1. Create flashcards for chemical equations and reactions. 2. Watch YouTube videos on balancing equations. 3. Practice past papers for organic chemistry.",
  },
];

const riskColors = {
  HIGH: "bg-destructive/10 text-destructive border-destructive/20",
  MEDIUM: "bg-warning/10 text-warning border-warning/20",
  LOW: "bg-success/10 text-success border-success/20",
};

const AiAnalysisPage = () => (
  <div className="animate-fade-in">
    <div className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">AI Analysis</h1>
      <p className="text-muted-foreground text-sm mt-1">AI-powered risk predictions and learning recommendations</p>
    </div>
    <div className="space-y-4">
      {MOCK_ANALYSIS.map((a) => (
        <Card key={a.admissionNo + a.subject}>
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-semibold text-foreground">{a.student}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{a.admissionNo}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${riskColors[a.riskLevel]}`}>
                    {a.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Subject: {a.subject}</p>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">Risk Score</span>
                      <span className="font-bold text-foreground">{a.riskPercentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${
                          a.riskPercentage > 70 ? "bg-destructive" : a.riskPercentage > 40 ? "bg-warning" : "bg-success"
                        }`}
                        style={{ width: `${a.riskPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">AI Recommendations</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{a.suggestion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AiAnalysisPage;
