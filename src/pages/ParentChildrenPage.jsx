import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";

const ParentChildrenPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("TERM_1");
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());

  const fetchChildren = async () => {
    setLoading(true);
    setError("");
    try { 
      const response = await api.parentChildren(term, academicYear);
      setItems(Array.isArray(response) ? response : []); 
    } catch (e) { 
      setError(e.message); 
      console.error("Failed to fetch children:", e);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [term, academicYear]);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>My Children</h1>
        <p className="subtitle">All children linked to your account</p>
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

      {loading && (
        <div className="text-center py-12">
          <Loader2 className="animate-spin mx-auto mb-3" size={32} />
          <p className="muted-text">Loading children...</p>
        </div>
      )}
      
      {error && (
        <div className="card danger-tint">
          <div className="card-content text-center">
            <AlertCircle className="mx-auto mb-2 text-danger" size={32} />
            <p style={{color:"hsl(var(--destructive))"}}>{error}</p>
            <button className="btn btn-outline mt-3" onClick={fetchChildren}>Retry</button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-2 gap-6">
          {items.map((c) => (
            <div key={c.admissionNumber} className="card hover:shadow-lg transition-shadow">
              <div className="card-content">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="text-primary" size={24}/>
                  </div>
                  <div>
                    <h2 style={{fontSize:"1.1rem"}} className="font-bold">{c.fullName}</h2>
                    <p className="text-sm muted-text">{c.className}</p>
                    <p className="text-xs mono">{c.admissionNumber}</p>
                  </div>
                </div>
                
                {/* Quick stats if available */}
                {c.performance && (
                  <div className="grid grid-3 gap-2 mb-3 text-center text-xs border-t pt-2">
                    <div>
                      <p className="muted-text">Grade</p>
                      <p className="font-bold">{c.performance.overallGrade || '-'}</p>
                    </div>
                    <div>
                      <p className="muted-text">Position</p>
                      <p className="font-bold">{c.performance.classPosition || '-'}</p>
                    </div>
                    <div>
                      <p className="muted-text">Risk</p>
                      <span className={`badge ${c.analysis?.overallRiskLevel === 'HIGH' ? 'danger' : c.analysis?.overallRiskLevel === 'MEDIUM' ? 'warning' : 'success'} text-xs`}>
                        {c.analysis?.overallRiskLevel || 'Unknown'}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-2">
                  <Link className="btn btn-primary btn-sm flex-1" to={`/parent/child/${c.admissionNumber}`}>
                    View Profile
                  </Link>
                  <Link className="btn btn-outline btn-sm flex-1" to={`/parent/child/${c.admissionNumber}/suggestions`}>
                    Suggestions
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="card col-span-2">
              <div className="card-content text-center">
                <GraduationCap size={48} className="mx-auto mb-3 muted-text" />
                <p className="muted-text">No children linked to your account yet.</p>
                <p className="text-xs muted-text mt-2">Please contact the school IT department to link your children to your account.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentChildrenPage;