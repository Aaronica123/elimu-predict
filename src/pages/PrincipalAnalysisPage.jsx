import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Brain, AlertTriangle, CheckCircle2, ListChecks } from "lucide-react";

const PrincipalAnalysisPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.principalAnalysis()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>School Analysis</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>School Analysis</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>School Analysis</h1>
        <p className="subtitle">{data.term} • {data.academicYear} • Generated {data.generatedAt && new Date(data.generatedAt).toLocaleString()}</p>
      </div>

      <div className="card mb-6">
        <div className="card-header"><h2 className="card-title flex items-center gap-2"><Brain/> Overall Analysis</h2></div>
        <div className="card-content"><p style={{lineHeight:1.6}}>{data.overallAnalysis}</p></div>
      </div>

      <div className="card mb-6 primary-tint">
        <div className="card-header"><h2 className="card-title">Principal's Recommendation</h2></div>
        <div className="card-content"><p style={{lineHeight:1.6}}>{data.principalRecommendation}</p></div>
      </div>

      <div className="grid grid-2 gap-6 mb-6">
        <div className="card">
          <div className="card-header"><h2 className="card-title flex items-center gap-2"><AlertTriangle style={{color:"hsl(var(--destructive))"}}/> Areas Needing Attention</h2></div>
          <div className="card-content">
            {(data.areasNeedingAttention || []).map((a, i) => (
              <div key={i} className="list-row">
                <div>
                  <p className="name">{a.area}</p>
                  <p className="meta">{a.reason}</p>
                  <p className="text-xs mt-1">💡 {a.recommendation}</p>
                </div>
                <span className={`badge ${a.priority === "HIGH" ? "danger" : a.priority === "MEDIUM" ? "warning" : ""}`}>{a.priority}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title flex items-center gap-2"><CheckCircle2 style={{color:"hsl(var(--success))"}}/> Areas Performing Well</h2></div>
          <div className="card-content">
            {(data.areasPerformingWell || []).map((a, i) => (
              <div key={i} className="list-row">
                <div>
                  <p className="name">{a.area}</p>
                  <p className="meta">{a.reason}</p>
                </div>
                <span className="badge success">{a.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h2 className="card-title flex items-center gap-2"><ListChecks/> Action Plan</h2></div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Priority</th><th>Action</th><th>Target Class</th><th>Target Subject</th><th>Expected Outcome</th></tr></thead>
              <tbody>
                {(data.actionPlan || []).map((a, i) => (
                  <tr key={i}>
                    <td className="font-bold">{a.priority}</td>
                    <td>{a.action}</td>
                    <td>{a.targetClass || "—"}</td>
                    <td>{a.targetSubject || "—"}</td>
                    <td className="muted-text">{a.expectedOutcome}</td>
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
export default PrincipalAnalysisPage;
