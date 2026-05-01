import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Lightbulb, Loader2, AlertCircle, ChevronRight } from "lucide-react";

const ParentSuggestionsPage = () => {
  const { adm } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("TERM_1");
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [expandedSubject, setExpandedSubject] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError("");
    try { 
      const response = await api.parentSuggestions(adm, term, academicYear);
      setData(response); 
    } catch (e) { 
      setError(e.message); 
      console.error("Failed to fetch suggestions:", e);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (adm) {
      fetchSuggestions();
    }
  }, [adm, term, academicYear]);

  if (loading) {
    return (
      <div className="page-header text-center py-12">
        <Loader2 className="animate-spin mx-auto mb-3" size={32} />
        <h1>AI Suggestions</h1>
        <p className="subtitle">Loading personalized recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <h1>AI Suggestions</h1>
        <p className="subtitle" style={{color:"hsl(var(--destructive))"}}>
          <AlertCircle className="inline mr-2" size={16}/>
          {error}
        </p>
        <button className="btn btn-outline mt-3" onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <button className="btn btn-outline btn-sm mb-2" onClick={() => window.history.back()}>
          ← Back to Profile
        </button>
        <h1>AI Suggestions for {data.fullName}</h1>
        <p className="subtitle">
          {data.term || term} {data.academicYear || academicYear} • 
          <span className="text-warning"> {data.subjectsNeedingAttention || 0} subject(s) need attention</span> • 
          <span className="text-success"> {data.subjectsPerformingWell || 0} doing well</span>
        </p>
      </div>

      {/* Term/Year Selector */}
      <div className="flex justify-end gap-2 mb-4">
        <select className="select" value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="TERM_1">Term 1</option>
          <option value="TERM_2">Term 2</option>
          <option value="TERM_3">Term 3</option>
        </select>
        <select className="select" value={academicYear} onChange={(e) => setAcademicYear(parseInt(e.target.value))}>
          <option>{academicYear}</option>
          <option>{academicYear - 1}</option>
          <option>{academicYear - 2}</option>
        </select>
      </div>

      {/* Overall Message */}
      <div className="card primary-tint mb-6">
        <div className="card-content">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-warning mt-1" size={24} />
            <div>
              <h3 className="font-bold mb-2">Overall Assessment</h3>
              <p style={{lineHeight: 1.6}}>{data.overallMessage || "No overall assessment available."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Suggestions */}
      <h2 className="text-lg font-bold mb-3">Subject-wise Recommendations</h2>
      <div style={{display:"flex", flexDirection:"column", gap:"1rem"}}>
        {(data.subjectSuggestions || []).map((s, i) => (
          <div 
            key={i} 
            className={`card cursor-pointer transition-all ${expandedSubject === i ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setExpandedSubject(expandedSubject === i ? null : i)}
          >
            <div className="card-content">
              <div className="row-between mb-3">
                <div>
                  <h3 className="flex items-center gap-2">
                    <Lightbulb style={{color: s.riskLevel === "HIGH" ? "hsl(var(--destructive))" : "hsl(var(--primary))"}} size={18}/> 
                    {s.subjectName}
                  </h3>
                  <p className="text-sm muted-text">
                    Current mean: {(s.currentMean ?? 0).toFixed(1)}% • 
                    Risk: {(s.riskPercentage ?? 0).toFixed(1)}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>
                    {s.riskLevel}
                  </span>
                  <ChevronRight size={16} className={`transition-transform ${expandedSubject === i ? 'rotate-90' : ''}`} />
                </div>
              </div>
              
              {/* Always show short suggestion */}
              <p className="text-sm" style={{lineHeight: 1.5}}>
                {s.suggestion?.substring(0, expandedSubject === i ? 500 : 100)}
                {!expandedSubject && s.suggestion?.length > 100 && '...'}
              </p>
              
              {/* Expanded view with action points */}
              {expandedSubject === i && s.actionPoints && s.actionPoints.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-bold text-sm mb-2">📋 Action Plan:</p>
                  <ul className="space-y-2" style={{paddingLeft:"1.25rem"}}>
                    {s.actionPoints.map((ap, j) => (
                      <li key={j} className="text-sm flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {ap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {expandedSubject === i && s.freshlyGenerated && (
                <div className="mt-3 text-xs text-primary">
                  ✨ Freshly generated recommendation based on latest assessment
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!data.subjectSuggestions || data.subjectSuggestions.length === 0) && (
        <div className="card text-center">
          <div className="card-content">
            <p className="muted-text">No subject-specific suggestions available.</p>
            <p className="text-xs muted-text mt-2">Ensure marks have been uploaded and AI analysis has been run.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentSuggestionsPage;