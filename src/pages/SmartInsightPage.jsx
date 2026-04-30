import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const SmartInsightPage = () => {
  const [className, setClassName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    if (!className.trim()) return;
    setLoading(true);
    try { setData(await api.smartInsight(className.trim())); }
    catch (err) { toast.error(err.message); setData(null); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Smart Class Insight</h1>
        <p className="subtitle">AI-driven multi-subject risk analysis & hidden strugglers</p>
      </div>

      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={load} className="flex gap-3 items-end">
            <div className="field" style={{flex:1, maxWidth:360}}>
              <label className="label">Class Name</label>
              <input className="input" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3A"/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Analysing…" : "Get Insight"}</button>
          </form>
        </div>
      </div>

      {data && (
        <>
          <div className="card mb-6 primary-tint">
            <div className="card-content">
              <h2>{data.className} • {data.term} {data.academicYear}</h2>
              <p className="muted-text">Critical subject: <strong>{data.criticalSubject || "—"}</strong> • {data.totalWeakStudents} weak students of {data.totalStudents}</p>
            </div>
          </div>

          <div className="card mb-6">
            <div className="card-header"><h2 className="card-title">Subject Insights</h2></div>
            <div className="card-content flush">
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Subject</th><th>Status</th><th>Avg Risk</th><th>High</th><th>Med</th><th>Low</th><th>Hidden</th><th>Action</th></tr></thead>
                  <tbody>
                    {(data.subjectInsights || []).map((s) => (
                      <tr key={s.subjectId}>
                        <td>{s.subjectName}</td>
                        <td><span className="badge">{s.subjectStatus}</span></td>
                        <td>{(s.classAverageRisk ?? 0).toFixed(1)}%</td>
                        <td>{s.highRiskCount}</td><td>{s.mediumRiskCount}</td><td>{s.lowRiskCount}</td>
                        <td>{s.hiddenStrugglerCount}</td>
                        <td className="text-xs muted-text">{s.actionRequired}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-header"><h2 className="card-title">Multi-Subject At-Risk Students</h2></div>
              <div className="card-content">
                {(data.multiSubjectRiskStudents || []).map((s) => (
                  <div key={s.admissionNumber} className="list-row">
                    <div>
                      <p className="name">{s.fullName}</p>
                      <p className="meta">{s.totalAtRiskSubjects} subjects at risk</p>
                    </div>
                    <span className={`badge ${s.overallUrgency === "HIGH" || s.overallUrgency === "CRITICAL" ? "danger" : "warning"}`}>{s.overallUrgency}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h2 className="card-title">Mixed Performers</h2></div>
              <div className="card-content">
                {(data.mixedPerformers || []).map((s) => (
                  <div key={s.admissionNumber} className="list-row">
                    <div>
                      <p className="name">{s.fullName}</p>
                      <p className="meta">{s.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SmartInsightPage;
