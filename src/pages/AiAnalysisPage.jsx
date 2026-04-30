import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";
import { Brain, Loader2 } from "lucide-react";

const AiAnalysisPage = () => {
  const [mode, setMode] = useState("class"); // "class" | "student"
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async (e) => {
    e.preventDefault();
    if (!target.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const resp = mode === "class"
        ? await api.analyzeClass(target.trim())
        : await api.analyzeStudent(target.trim());
      setResult(resp);
      toast.success("Analysis complete");
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>AI Analysis</h1>
        <p className="subtitle">Trigger AI risk analysis for a student or whole class</p>
      </div>

      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={run} className="grid grid-3 gap-3 items-end">
            <div className="field">
              <label className="label">Target</label>
              <select className="select" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="class">Whole Class</option>
                <option value="student">Single Student</option>
              </select>
            </div>
            <div className="field" style={{gridColumn:"span 2"}}>
              <label className="label">{mode === "class" ? "Class Name" : "Admission Number"}</label>
              <input className="input" value={target} onChange={(e) => setTarget(e.target.value)} placeholder={mode === "class" ? "Form 3A" : "ADM2024001"}/>
            </div>
            <div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <><Loader2 className="animate-spin"/> Analysing…</> : <><Brain/> Run Analysis</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {Array.isArray(result) && result.length > 0 && (
        <div className="card">
          <div className="card-header"><h2 className="card-title">Results</h2></div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Adm No</th><th>Subject</th><th>Risk %</th><th>Level</th><th>Term</th><th>Suggestion</th></tr></thead>
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="mono">{r.admissionNumber}</td>
                      <td>{r.subjectName}</td>
                      <td>{(r.riskPercentage ?? 0).toFixed(1)}%</td>
                      <td><span className={`badge ${r.riskLevel === "HIGH" ? "danger" : r.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{r.riskLevel}</span></td>
                      <td>{r.term}</td>
                      <td className="text-xs muted-text" style={{maxWidth:"22rem"}}>{r.suggestion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {result && !Array.isArray(result) && (
        <div className="card"><div className="card-content"><pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(result, null, 2)}</pre></div></div>
      )}
    </div>
  );
};
export default AiAnalysisPage;
