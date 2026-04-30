import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";

const MyClassesPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.myClasses()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>My Classes</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>My Classes</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>My Classes & Subjects</h1>
        <p className="subtitle">{data.teacherName}</p>
      </div>

      <div className="grid grid-2 gap-6">
        {(data.classSubjects || []).map((cs, i) => (
          <div key={i} className="card">
            <div className="card-header"><h2 className="card-title">{cs.className}</h2></div>
            <div className="card-content">
              {(cs.subjects || []).map((s) => (
                <div key={s.subjectId} className="list-row">
                  <div>
                    <p className="name">{s.subjectName}</p>
                    <p className="meta mono">{s.subjectCode}</p>
                  </div>
                  <Link className="btn btn-outline btn-sm" to={`/teacher/subject?code=${encodeURIComponent(s.subjectCode)}&class=${encodeURIComponent(cs.className)}`}>View</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
        {(data.classSubjects || []).length === 0 && <p className="muted-text">No classes assigned.</p>}
      </div>
    </div>
  );
};
export default MyClassesPage;
