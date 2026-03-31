import { Card, CardContent } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

const MOCK_LOGS = [
  { id: 1, userId: "TCH001", userRole: "TEACHER", action: "UPLOAD_MARKS", target: "StudentRecord", description: "Uploaded CAT1 marks for ADM2024001 in Mathematics", timestamp: "2024-11-15T10:30:00", ip: "192.168.1.45" },
  { id: 2, userId: "ITH001", userRole: "IT_HANDLER", action: "REGISTER_USER", target: "User", description: "Registered new teacher account TCH006", timestamp: "2024-11-15T09:15:00", ip: "192.168.1.20" },
  { id: 3, userId: "ADM001", userRole: "ADMIN", action: "ASSIGN_ROLE", target: "User", description: "Assigned SENIOR_TEACHER role to TCH003", timestamp: "2024-11-14T16:45:00", ip: "192.168.1.10" },
  { id: 4, userId: "SNR001", userRole: "SENIOR_TEACHER", action: "TRIGGER_AI", target: "AiAnalysis", description: "Triggered AI analysis for Form 3A", timestamp: "2024-11-14T14:20:00", ip: "192.168.1.33" },
  { id: 5, userId: "PRC001", userRole: "PRINCIPAL", action: "LOGIN", target: null, description: "Logged in from Chrome/Windows", timestamp: "2024-11-14T08:00:00", ip: "192.168.1.1" },
];

const AuditLogsPage = () => (
  <div className="animate-fade-in">
    <div className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Audit Logs</h1>
      <p className="text-muted-foreground text-sm mt-1">Complete system activity trail</p>
    </div>
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-semibold text-foreground">Timestamp</th>
                <th className="text-left p-4 font-semibold text-foreground">User</th>
                <th className="text-left p-4 font-semibold text-foreground">Role</th>
                <th className="text-left p-4 font-semibold text-foreground">Action</th>
                <th className="text-left p-4 font-semibold text-foreground">Description</th>
                <th className="text-left p-4 font-semibold text-foreground">IP</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-mono text-xs text-foreground">{l.userId}</td>
                  <td className="p-4 text-xs text-muted-foreground">{l.userRole}</td>
                  <td className="p-4 text-xs font-medium text-foreground">{l.action}</td>
                  <td className="p-4 text-xs text-muted-foreground max-w-xs truncate">{l.description}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AuditLogsPage;
