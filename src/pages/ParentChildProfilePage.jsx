import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";

const ParentChildProfilePage = () => {
  const { adm } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.parentChild(adm)); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [adm]);

  if (loading) return <div className="page-header"><h1>Child Profile</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>Child Profile</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  const p = data.performance || {};
  const a = data.analysis || {};
  const ab = data.assessmentBreakDown || {};

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>{data.fullName}</h1>
        <p className="subtitle">{data.className} • {data.term} {data.academicYear} • {data.admissionNumber}</p>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Marks Obtained</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{(p.totalMarksObtained ?? 0).toFixed(0)} / {(p.totalMarksAvailable ?? 0).toFixed(0)}</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Overall Grade</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{p.overallGrade || "—"}</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Class Position</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{p.classPosition} / {p.totalStudents}</p></div></div>
        <div className="card"><div className="card-content"><p className="text-xs muted-text">Performance Band</p><p style={{fontSize:"1.5rem",fontWeight:700}}>{p.performanceBand || "—"}</p></div></div>
      </div>

      <div className="card mb-6 primary-tint">
        <div className="card-content">
          <h3>🤖 Parent Summary</h3>
          <p style={{lineHeight:1.6}}>{a.parentSummary}</p>
        </div>
      </div>

      <div className="card mb-6">
        <div className="card-header"><h2 className="card-title">Subject Risk Summary</h2></div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Subject</th><th>Risk %</th><th>Level</th><th>Prev Mean</th><th>Current Mean</th><th>Change</th></tr></thead>
              <tbody>
                {(a.subjectRiskSummaries || []).map((s, i) => (
                  <tr key={i}>
                    <td>{s.subjectName}</td>
                    <td>{(s.riskPercentage ?? 0).toFixed(1)}%</td>
                    <td><span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{s.riskLevel}</span></td>
                    <td>{(s.previousTermMean ?? 0).toFixed(1)}</td>
                    <td>{(s.currentTermMean ?? 0).toFixed(1)}</td>
                    <td>{(s.markChange ?? 0).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h2 className="card-title">Assessment Breakdown</h2></div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Subject</th><th>CAT1</th><th>CAT2</th><th>CAT3</th><th>Exam1</th><th>Exam2</th><th>Mean</th></tr></thead>
              <tbody>
                {(ab.subjectAssessments || []).map((s, i) => (
                  <tr key={i}>
                    <td>{s.subjectName}</td>
                    <td>{s.cat1 ?? "—"}</td><td>{s.cat2 ?? "—"}</td><td>{s.cat3 ?? "—"}</td>
                    <td>{s.exam1 ?? "—"}</td><td>{s.exam2 ?? "—"}</td>
                    <td className="font-bold">{(s.mean ?? 0).toFixed(1)}</td>
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
export default ParentChildProfilePage;
