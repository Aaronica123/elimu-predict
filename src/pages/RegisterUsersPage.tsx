import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RegisterUsersPage = () => {
  const [formData, setFormData] = useState({ fullName: "", userId: "", password: "", role: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: api.post("/auth/register", formData)
    toast.success("User registered successfully", { description: `${formData.fullName} registered as ${formData.role}` });
    setFormData({ fullName: "", userId: "", password: "", role: "" });
  };

  return (
    <div className="animate-fade-in max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Register New User</h1>
        <p className="text-muted-foreground text-sm mt-1">Only IT Support can register new school personnel and parents</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Full Name</Label>
              <Input required placeholder="e.g. Jane Wanjiku" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Staff / Parent ID</Label>
              <Input required placeholder="e.g. TCH002" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Temporary Password</Label>
              <Input required type="password" placeholder="Set initial password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Role</Label>
              <Select onValueChange={(v) => setFormData({ ...formData, role: v })}>
                <SelectTrigger><SelectValue placeholder="Assign role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="SENIOR_TEACHER">Senior Teacher</SelectItem>
                  <SelectItem value="DEPUTY_PRINCIPAL">Deputy Principal</SelectItem>
                  <SelectItem value="PRINCIPAL">Principal</SelectItem>
                  <SelectItem value="PARENT">Parent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full mt-2"><UserPlus className="h-4 w-4 mr-2" />Register User</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterUsersPage;
