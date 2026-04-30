import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const StudentTimelinePage = () => {
  const [adm, setAdm] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    if (!adm.trim()) return;
    setLoading(true);
    try { setData(await api.studentTimeline(adm.trim())); }
    catch (err) { toast.error(err.message); setData(null); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Student Progress Timeline</h1>
        <p className="subtitle">Term-by-term performance trajectory</p>
      </div>

      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={load} className="flex gap-3 items-end">
            <div className="field" style={{flex:1, maxWidth:360}}>
              <label className="label">Admission Number</label>
              <input className="input" value={adm} onChange={(e) => setAdm(e.target.value.toUpperCase())} placeholder="ADM2024001"/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Loading…" : "Load Timeline"}</button>
          </form>
        </div>
      </div>

      {data && (
        <div style={{display:"flex", flexDirection:"column", gap:"1.25rem"}}>
          <div className="card">
            <div className="card-content">
              <h2>{data.fullName}</h2>
              <p className="text-sm muted-text">Adm: {data.admissionNumber}</p>
              <p className="mt-3"><strong>Trajectory:</strong> {data.overallTrajectory}</p>
              <p className="muted-text" style={{lineHeight:1.6}}>{data.comment}</p>
            </div>
          </div>

          {(data.timeLine || []).map((t, i) => (
            <div key={i} className="card">
              <div className="card-header"><h2 className="card-title">{t.term} • {t.academicYear} <span className={`badge ${t.overallRiskLeve === "HIGH" ? "danger" : t.overallRiskLeve === "MEDIUM" ? "warning" : "success"}`}>{t.overallRiskLeve}</span></h2></div>
              <div className="card-content flush">
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th>Subject</th><th>Risk %</th><th>Risk Level</th><th>Trend</th></tr></thead>
                    <tbody>
                      {(t.subjectPerformances || []).map((s, j) => (
                        <tr key={j}>
                          <td>{s.subjectName}</td>
                          <td>{(s.riskPercentage ?? 0).toFixed(1)}%</td>
                          <td><span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{s.riskLevel}</span></td>
                          <td>{s.trend > 0 ? "↑" : s.trend < 0 ? "↓" : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default StudentTimelinePage;
