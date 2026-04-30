import { Link } from "react-router-dom";
import { BarChart3, FileText, TrendingUp } from "lucide-react";

const REPORTS = [
  { title: "School Overview", desc: "School-wide risk distribution and class summaries.", to: "/reports/school", icon: BarChart3 },
  { title: "Class Report", desc: "Subject weakness % and student summaries per class.", to: "/reports/class", icon: FileText },
  { title: "Student Timeline", desc: "Term-by-term performance trajectory for one student.", to: "/reports/student-timeline", icon: TrendingUp },
];

const ReportsPage = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1>Reports</h1>
      <p className="subtitle">Choose a report to drill into</p>
    </div>
    <div className="grid grid-3">
      {REPORTS.map((r) => (
        <Link key={r.to} to={r.to} className="card report-card" style={{textDecoration:"none", color:"inherit"}}>
          <div className="icon-wrap"><r.icon /></div>
          <h3>{r.title}</h3>
          <p className="text-sm muted-text">{r.desc}</p>
        </Link>
      ))}
    </div>
  </div>
);
export default ReportsPage;
