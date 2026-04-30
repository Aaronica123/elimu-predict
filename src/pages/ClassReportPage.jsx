import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const ClassReportPage = () => {
  const [className, setClassName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    if (!className.trim()) return;
    setLoading(true);
    try { setData(await api.classReport(className.trim())); }
    catch (err) { toast.error(err.message); setData(null); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Class Report</h1>
        <p className="subtitle">Subject weaknesses & student summaries per class</p>
      </div>

      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={load} className="flex gap-3 items-end">
            <div className="field" style={{flex:1, maxWidth:360}}>
              <label className="label">Class Name</label>
              <input className="input" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="e.g. Form 3A"/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Loading…" : "Load Report"}</button>
          </form>
        </div>
      </div>

      {data && (
        <>
          <div className="grid grid-3 mb-6">
            <div className="card"><div className="card-content"><p className="text-xs muted-text">Total Students</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{data.totalStudents}</p></div></div>
            <div className="card"><div className="card-content"><p className="text-xs muted-text">Analyzed</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{data.analyzedStudents}</p></div></div>
            <div className="card"><div className="card-content"><p className="text-xs muted-text">High / Med / Low</p><p style={{fontSize:"1.25rem",fontWeight:700}}>{data.highRiskCount} / {data.mediumRiskCount} / {data.lowRiskCount}</p></div></div>
          </div>

          <div className="grid grid-2 gap-6">
            <div className="card">
              <div className="card-header"><h2 className="card-title">Subject Weaknesses</h2></div>
              <div className="card-content flush">
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th>Subject</th><th>Weakness %</th><th>Affected</th></tr></thead>
                    <tbody>
                      {(data.subjectWeaknesses || []).map((s, i) => (
                        <tr key={i}><td>{s.subjectName}</td><td>{(s.weaknessPercentage ?? 0).toFixed(1)}%</td><td>{s.affectedStudents}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h2 className="card-title">Student Summaries</h2></div>
              <div className="card-content flush">
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th>Adm No</th><th>Name</th><th>Risk Level</th><th>Avg Risk</th></tr></thead>
                    <tbody>
                      {(data.studentSummaries || []).map((s) => (
                        <tr key={s.admissionNumber}>
                          <td className="mono">{s.admissionNumber}</td>
                          <td>{s.fullName}</td>
                          <td><span className={`badge ${s.overallRiskLevel === "HIGH" ? "danger" : s.overallRiskLevel === "MEDIUM" ? "warning" : "success"}`}>{s.overallRiskLevel}</span></td>
                          <td>{(s.averageRiskScore ?? 0).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ClassReportPage;
