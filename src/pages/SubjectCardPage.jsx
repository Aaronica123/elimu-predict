import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api";

const SubjectCardPage = () => {
  const [params] = useSearchParams();
  const code = params.get("code") || "";
  const cls = params.get("class") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code || !cls) { setLoading(false); return; }
    (async () => {
      try { setData(await api.teacherSubjectCard(code, cls)); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [code, cls]);

  if (!code || !cls) return <div className="page-header"><h1>Subject Card</h1><p className="subtitle">Provide ?code=...&amp;class=... in URL.</p></div>;
  if (loading) return <div className="page-header"><h1>Subject Card</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>Subject Card</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>{data.subjectName} — {data.className}</h1>
        <p className="subtitle">{data.subjectCode} • {data.subjectStatus}</p>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Class Avg</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{(data.classAverageMark ?? 0).toFixed(1)}%</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Mean Risk</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{(data.classMeanRisk ?? 0).toFixed(1)}%</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">High Risk</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{data.highRiskCount}</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Low Risk</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{data.lowRiskCount}</p></div></div>
      </div>

      <div className="grid grid-2 gap-6">
        <div className="card">
          <div className="card-header"><h2 className="card-title">At-Risk Students</h2></div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Adm</th><th>Name</th><th>Mean</th><th>Risk %</th><th>Level</th></tr></thead>
                <tbody>
                  {(data.atRiskStudents || []).map((s) => (
                    <tr key={s.admissionNumber}>
                      <td className="mono">{s.admissionNumber}</td>
                      <td>{s.fullName}</td>
                      <td>{(s.subjectMean ?? 0).toFixed(1)}</td>
                      <td>{(s.riskPercentage ?? 0).toFixed(1)}%</td>
                      <td><span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{s.riskLevel}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h2 className="card-title">Top Students</h2></div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Adm</th><th>Name</th><th>Mean</th><th>Risk %</th></tr></thead>
                <tbody>
                  {(data.topStudents || []).map((s) => (
                    <tr key={s.admissionNumber}>
                      <td className="mono">{s.admissionNumber}</td>
                      <td>{s.fullName}</td>
                      <td>{(s.subjectMean ?? 0).toFixed(1)}</td>
                      <td>{(s.riskPercentage ?? 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubjectCardPage;
