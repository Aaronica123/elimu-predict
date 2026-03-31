import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const ReportsPage = () => (
  <div className="animate-fade-in">
    <div className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Reports</h1>
      <p className="text-muted-foreground text-sm mt-1">Performance reports and analytics</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { title: "Student Risk Report", desc: "Individual student risk breakdown with AI suggestions" },
        { title: "Class Weakness Report", desc: "Subject-wise weakness percentages per class" },
        { title: "School Overview", desc: "School-wide performance and resource allocation" },
      ].map((r) => (
        <Card key={r.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardContent className="p-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default ReportsPage;
