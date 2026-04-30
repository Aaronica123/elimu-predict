import { useEffect, useState } from "react";
import api from "@/lib/api";
import StatCard from "@/components/StatCard";
import { GraduationCap, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

const SchoolReportPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.schoolReport()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>School Overview</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>School Overview</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>School Overview</h1>
        <p className="subtitle">School-wide risk distribution & class summary</p>
      </div>
      <div className="grid grid-4 mb-8">
        <StatCard label="Total Students" value={data.totalStudents} icon={GraduationCap} variant="primary"/>
        <StatCard label="High Risk" value={data.totalHighRisk} icon={AlertTriangle} variant="danger"/>
        <StatCard label="Medium Risk" value={data.totalMediumRisk} icon={AlertCircle} variant="warning"/>
        <StatCard label="Low Risk" value={data.totalLowRisk} icon={CheckCircle2} variant="success"/>
      </div>

      <div className="card">
        <div className="card-header"><h2 className="card-title">Class Summaries</h2></div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Class</th><th>Students</th><th>High Risk</th><th>Avg Risk Score</th><th>Weakest Subject</th></tr></thead>
              <tbody>
                {(data.classSummaries || []).map((c) => (
                  <tr key={c.className}>
                    <td className="font-bold">{c.className}</td>
                    <td>{c.totalStudents}</td>
                    <td><span className="badge danger">{c.highRiskCount}</span></td>
                    <td>{(c.averageRiskScore ?? 0).toFixed(1)}</td>
                    <td>{c.mostWeakSubject || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SchoolReportPage;
