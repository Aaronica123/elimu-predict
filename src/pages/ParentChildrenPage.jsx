import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const ParentChildrenPage = () => {
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

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>My Children</h1>
        <p className="subtitle">All children linked to your account</p>
      </div>

      {loading && <p className="muted-text">Loading…</p>}
      {error && <p style={{color:"hsl(var(--destructive))"}}>{error}</p>}

      <div className="grid grid-2 gap-6">
        {(items || []).map((c) => (
          <div key={c.admissionNumber} className="card">
            <div className="card-content">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap style={{color:"hsl(var(--primary))"}}/>
                <div>
                  <h2 style={{fontSize:"1.1rem"}}>{c.fullName}</h2>
                  <p className="text-sm muted-text">{c.className} • {c.admissionNumber}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link className="btn btn-primary btn-sm" to={`/parent/child/${c.admissionNumber}`}>View Profile</Link>
                <Link className="btn btn-outline btn-sm" to={`/parent/child/${c.admissionNumber}/suggestions`}>Suggestions</Link>
              </div>
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && <p className="muted-text">No children linked yet.</p>}
      </div>
    </div>
  );
};
export default ParentChildrenPage;
