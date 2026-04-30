import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Lightbulb } from "lucide-react";

const ParentSuggestionsPage = () => {
  const { adm } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.parentSuggestions(adm)); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [adm]);

  if (loading) return <div className="page-header"><h1>Suggestions</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>Suggestions</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Suggestions for {data.fullName}</h1>
        <p className="subtitle">{data.term} {data.academicYear} • {data.subjectsNeedingAttention} subject(s) need attention, {data.subjectsPerformingWell} doing well</p>
      </div>

      <div className="card mb-6 primary-tint">
        <div className="card-content"><p style={{lineHeight:1.6}}>{data.overallMessage}</p></div>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
        {(data.subjectSuggestions || []).map((s, i) => (
          <div key={i} className="card">
            <div className="card-content">
              <div className="row-between mb-3">
                <div>
                  <h3 className="flex items-center gap-2"><Lightbulb style={{color:"hsl(var(--primary))"}}/> {s.subjectName}</h3>
                  <p className="text-sm muted-text">Current mean: {(s.currentMean ?? 0).toFixed(1)} • Risk: {(s.riskPercentage ?? 0).toFixed(1)}%</p>
                </div>
                <span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>{s.riskLevel}</span>
              </div>
              <p style={{lineHeight:1.6}}>{s.suggestion}</p>
              {s.actionPoints && s.actionPoints.length > 0 && (
                <ul className="mt-3" style={{paddingLeft:"1.25rem"}}>
                  {s.actionPoints.map((ap, j) => <li key={j}>{ap}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ParentSuggestionsPage;
