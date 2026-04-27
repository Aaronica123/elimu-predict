import { BarChart3 } from "lucide-react";
const ReportsPage = () => (<div className="animate-fade-in">
    <div className="page-header">
      <h1>Reports</h1>
      <p className="subtitle">Performance reports and analytics</p>
    </div>
    <div className="grid grid-3">
      {[
        { title: "Student Risk Report", desc: "Individual student risk breakdown with AI suggestions" },
        { title: "Class Weakness Report", desc: "Subject-wise weakness percentages per class" },
        { title: "School Overview", desc: "School-wide performance and resource allocation" },
    ].map((r) => (<div key={r.title} className="card report-card">
          <div className="icon-wrap"><BarChart3 /></div>
          <h3>{r.title}</h3>
          <p className="text-sm muted-text">{r.desc}</p>
        </div>))}
    </div>
  </div>);
export default ReportsPage;
