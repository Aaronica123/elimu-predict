import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const StudentResultsPage = () => {
  const [adm, setAdm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (e) => {
    e.preventDefault();
    if (!adm.trim()) return;
    setLoading(true);
    try {
      const resp = showAll ? await api.studentResultsAll(adm.trim()) : await api.studentResults(adm.trim());
      setItems(Array.isArray(resp) ? resp : []);
    } catch (err) { toast.error(err.message); setItems([]); }
    finally { setLoading(false); }
  };

  const trigger = async () => {
    if (!adm.trim()) return;
    try { await api.analyzeStudent(adm.trim()); toast.success("Analysis triggered"); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>AI Student Results</h1>
        <p className="subtitle">Per-subject AI risk analysis for a student</p>
      </div>

      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={load} className="flex gap-3 items-end flex-wrap">
            <div className="field" style={{flex:1, maxWidth:300}}>
              <label className="label">Admission Number</label>
              <input className="input" value={adm} onChange={(e) => setAdm(e.target.value.toUpperCase())} placeholder="ADM2024001"/>
            </div>
            <div className="field">
              <label className="label"><input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)}/> All terms</label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Loading…" : "Load Results"}</button>
            <button type="button" className="btn btn-outline" onClick={trigger}>Re-analyze</button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Subject</th><th>Risk %</th><th>Level</th><th>Trend</th><th>Term</th><th>Year</th><th>Suggestion</th></tr></thead>
              <tbody>
                {items.map((r, i) => (
                  <tr key={i}>
                    <td>{r.subjectName}</td>
                    <td>{(r.riskPercentage ?? 0).toFixed(1)}%</td>
                    <td><span className={`badge ${r.riskLevel === "HIGH" ? "danger" : r.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{r.riskLevel}</span></td>
                    <td>{r.trend > 0 ? "↑" : r.trend < 0 ? "↓" : "—"}</td>
                    <td>{r.term}</td>
                    <td>{r.academicYear}</td>
                    <td className="text-xs muted-text" style={{maxWidth:"24rem"}}>{r.suggestion}</td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={7} className="text-center muted-text" style={{padding:"2rem"}}>No results loaded</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentResultsPage;
