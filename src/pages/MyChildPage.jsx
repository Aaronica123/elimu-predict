import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { GraduationCap, Loader2 } from "lucide-react";

const MyChildPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setItems(await api.parentChildren()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>My Child's Progress</h1><p className="subtitle"><Loader2 className="animate-spin"/> Loading…</p></div>;
  if (error) return <div className="page-header"><h1>My Child's Progress</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>My Child's Progress</h1>
        <p className="subtitle">Tap a child to view their full performance, analysis and suggestions.</p>
      </div>

      <div className="grid grid-2 gap-6">
        {(items || []).map((c) => (
          <div key={c.admissionNumber} className="card">
            <div className="card-content">
              <div className="flex items-center gap-3 mb-3">
                <div style={{width:"3rem",height:"3rem",borderRadius:"9999px",background:"hsl(var(--primary)/0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <GraduationCap style={{color:"hsl(var(--primary))"}}/>
                </div>
                <div>
                  <h2 style={{fontSize:"1.125rem"}}>{c.fullName}</h2>
                  <p className="text-sm muted-text">{c.className}</p>
                  <p className="text-xs mono">{c.admissionNumber}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link className="btn btn-primary btn-sm" to={`/parent/child/${c.admissionNumber}`}>View Profile</Link>
                <Link className="btn btn-outline btn-sm" to={`/parent/child/${c.admissionNumber}/suggestions`}>Suggestions</Link>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card"><div className="card-content">
            <p className="muted-text">No children are linked to your account yet. Please contact the school IT department.</p>
          </div></div>
        )}
      </div>
    </div>
  );
};
export default MyChildPage;
