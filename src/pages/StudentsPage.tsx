import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const MOCK_STUDENTS = [
  { admissionNo: "ADM2024001", fullName: "Brian Otieno", className: "Form 3A", stream: "East" },
  { admissionNo: "ADM2024002", fullName: "Faith Wambui", className: "Form 3A", stream: "West" },
  { admissionNo: "ADM2024003", fullName: "Dennis Njoroge", className: "Form 2A", stream: "East" },
  { admissionNo: "ADM2024004", fullName: "Grace Muthoni", className: "Form 1B", stream: null },
  { admissionNo: "ADM2024005", fullName: "Kevin Kiprop", className: "Form 4A", stream: "East" },
];

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const { hasRole } = useAuth();

  const filtered = MOCK_STUDENTS.filter(
    (s) => s.fullName.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage student records</p>
        </div>
        {hasRole(["IT_HANDLER", "ADMIN"]) && (
          <Button><Plus className="h-4 w-4 mr-2" />Add Student</Button>
        )}
      </div>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or admission no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Admission No</th>
                  <th className="text-left p-4 font-semibold text-foreground">Full Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Class</th>
                  <th className="text-left p-4 font-semibold text-foreground">Stream</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.admissionNo} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs text-foreground">{s.admissionNo}</td>
                    <td className="p-4 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground">{s.fullName}</span>
                    </td>
                    <td className="p-4 text-foreground">{s.className}</td>
                    <td className="p-4 text-muted-foreground">{s.stream || "—"}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No students found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;
