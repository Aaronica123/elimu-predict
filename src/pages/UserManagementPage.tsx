import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";

const MOCK_USERS = [
  { id: 1, fullName: "Jane Wanjiku", userId: "TCH001", role: "TEACHER", isActive: true },
  { id: 2, fullName: "Peter Ochieng", userId: "SNR001", role: "SENIOR_TEACHER", isActive: true },
  { id: 3, fullName: "Dr. Mary Akinyi", userId: "PRC001", role: "PRINCIPAL", isActive: true },
  { id: 4, fullName: "Kevin Mwangi", userId: "ITH001", role: "IT_HANDLER", isActive: true },
  { id: 5, fullName: "Grace Atieno", userId: "PAR001", role: "PARENT", isActive: true },
  { id: 6, fullName: "James Oloo", userId: "TCH005", role: "TEACHER", isActive: false },
];

const UserManagementPage = () => (
  <div className="animate-fade-in">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage roles and access for all users</p>
      </div>
    </div>
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-semibold text-foreground">User</th>
                <th className="text-left p-4 font-semibold text-foreground">ID</th>
                <th className="text-left p-4 font-semibold text-foreground">Role</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{u.fullName}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{u.userId}</td>
                  <td className="p-4">
                    <Badge variant="secondary" className="text-xs">{u.role.replace("_", " ")}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={u.isActive ? "default" : "destructive"} className="text-xs">
                      {u.isActive ? "Active" : "Revoked"}
                    </Badge>
                  </td>
                  <td className="p-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info("Role assignment dialog would open here")}>
                      <Shield className="h-3 w-3 mr-1" />Assign
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => toast.info("Access revoked")}>
                      <ShieldOff className="h-3 w-3 mr-1" />Revoke
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default UserManagementPage;
