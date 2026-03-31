import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const MOCK_SUBJECTS = [
  { id: 1, code: "MATH101", name: "Mathematics", teacher: "Jane Wanjiku", className: "Form 3A", isActive: true },
  { id: 2, code: "ENG201", name: "English", teacher: "Anne Kemunto", className: "Form 3A", isActive: true },
  { id: 3, code: "PHY301", name: "Physics", teacher: "James Oloo", className: "Form 3A", isActive: true },
  { id: 4, code: "CHEM101", name: "Chemistry", teacher: "Peter Ochieng", className: "Form 2A", isActive: true },
];

const SubjectsPage = () => (
  <div className="animate-fade-in">
    <div className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Subjects</h1>
      <p className="text-muted-foreground text-sm mt-1">View and manage subject assignments</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_SUBJECTS.map((s) => (
        <Card key={s.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">{s.code}</p>
                <h3 className="font-heading font-semibold text-foreground">{s.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Teacher: {s.teacher}</p>
                <p className="text-xs text-muted-foreground">Class: {s.className}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SubjectsPage;
