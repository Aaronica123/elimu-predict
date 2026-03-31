import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const MarksEntryPage = () => {
  const [formData, setFormData] = useState({
    admissionNumber: "",
    subjectId: "",
    marksObtained: "",
    examType: "",
    term: "",
    academicYear: "2024",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: api.post("/marks", formData)
    toast.success("Marks uploaded successfully", {
      description: `Marks saved for ${formData.admissionNumber}`,
    });
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Marks Entry</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload student examination marks</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Admission Number</Label>
                <Input
                  placeholder="ADM2024001"
                  value={formData.admissionNumber}
                  onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Subject</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, subjectId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mathematics</SelectItem>
                    <SelectItem value="2">English</SelectItem>
                    <SelectItem value="3">Physics</SelectItem>
                    <SelectItem value="4">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Marks Obtained</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="0 - 100"
                  value={formData.marksObtained}
                  onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Exam Type</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, examType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select exam type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAT1">CAT 1</SelectItem>
                    <SelectItem value="CAT2">CAT 2</SelectItem>
                    <SelectItem value="MID_TERM">Mid Term</SelectItem>
                    <SelectItem value="END_TERM">End Term</SelectItem>
                    <SelectItem value="MOCK">Mock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Term</Label>
                <Select onValueChange={(v) => setFormData({ ...formData, term: v })}>
                  <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TERM_1">Term 1</SelectItem>
                    <SelectItem value="TERM_2">Term 2</SelectItem>
                    <SelectItem value="TERM_3">Term 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Academic Year</Label>
                <Input
                  type="number"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Upload Marks</Button>
              <Button type="reset" variant="outline" onClick={() => setFormData({ admissionNumber: "", subjectId: "", marksObtained: "", examType: "", term: "", academicYear: "2024" })}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarksEntryPage;
