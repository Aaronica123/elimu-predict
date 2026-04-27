const MOCK_LOGS = [
    { id: 1, userId: "TCH001", userRole: "TEACHER", action: "UPLOAD_MARKS", description: "Uploaded CAT1 marks for ADM2024001 in Mathematics", timestamp: "2024-11-15T10:30:00", ip: "192.168.1.45" },
    { id: 2, userId: "ITH001", userRole: "IT_HANDLER", action: "REGISTER_USER", description: "Registered new teacher account TCH006", timestamp: "2024-11-15T09:15:00", ip: "192.168.1.20" },
    { id: 3, userId: "ADM001", userRole: "ADMIN", action: "ASSIGN_ROLE", description: "Assigned SENIOR_TEACHER role to TCH003", timestamp: "2024-11-14T16:45:00", ip: "192.168.1.10" },
    { id: 4, userId: "SNR001", userRole: "SENIOR_TEACHER", action: "TRIGGER_AI", description: "Triggered AI analysis for Form 3A", timestamp: "2024-11-14T14:20:00", ip: "192.168.1.33" },
    { id: 5, userId: "PRC001", userRole: "PRINCIPAL", action: "LOGIN", description: "Logged in from Chrome/Windows", timestamp: "2024-11-14T08:00:00", ip: "192.168.1.1" },
];
const AuditLogsPage = () => (<div className="animate-fade-in">
    <div className="page-header">
      <h1>Audit Logs</h1>
      <p className="subtitle">Complete system activity trail</p>
    </div>
    <div className="card">
      <div className="card-content flush">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Description</th><th>IP</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LOGS.map((l) => (<tr key={l.id}>
                  <td className="text-xs muted-text" style={{ whiteSpace: "nowrap" }}>{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="mono">{l.userId}</td>
                  <td className="text-xs muted-text">{l.userRole}</td>
                  <td className="text-xs font-bold">{l.action}</td>
                  <td className="text-xs muted-text" style={{ maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis" }}>{l.description}</td>
                  <td className="mono">{l.ip}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>);
export default AuditLogsPage;
