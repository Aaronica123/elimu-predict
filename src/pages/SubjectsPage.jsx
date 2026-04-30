import { BookOpen, Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";

const SubjectsPage = () => {
  const { hasRole } = useAuth();
  const canCreate = hasRole(["ADMIN", "IT_HANDLER", "PRINCIPAL", "DEPUTY_PRINCIPAL"]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subjectCode: "", subjectName: "", className: "" });

  const load = async () => {
    try { setItems(await api.subjectsAll()); }
    catch (e) { toast.error(e.message); }
  };
  useEffect(() => { load(); }, []);

  const filtered = items.filter((s) =>
    (s.subjectName || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.subjectCode || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.className || "").toLowerCase().includes(search.toLowerCase())
  );

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createSubject(form);
      toast.success("Subject created");
      setForm({ subjectCode: "", subjectName: "", className: "" });
      setShowForm(false);
      load();
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div className="animate-fade-in">
      <div className="row-between mb-6">
        <div>
          <h1>Subjects</h1>
          <p className="subtitle">All subjects per class</p>
        </div>
        {canCreate && (
          <button className="btn btn-primary" onClick={() => setShowForm((v) => !v)}>
            <Plus/> New Subject
          </button>
        )}
      </div>

      {canCreate && showForm && (
        <div className="card mb-6">
          <div className="card-content">
            <form onSubmit={submit} className="grid grid-3 gap-3 items-end">
              <div className="field"><label className="label">Code</label>
                <input className="input" required value={form.subjectCode} onChange={(e) => setForm({...form, subjectCode: e.target.value.toUpperCase()})} placeholder="MATH101"/>
              </div>
              <div className="field"><label className="label">Name</label>
                <input className="input" required value={form.subjectName} onChange={(e) => setForm({...form, subjectName: e.target.value})} placeholder="Mathematics"/>
              </div>
              <div className="field"><label className="label">Class</label>
                <input className="input" required value={form.className} onChange={(e) => setForm({...form, className: e.target.value})} placeholder="Form 1A"/>
              </div>
              <div><button type="submit" className="btn btn-primary">Create</button></div>
            </form>
          </div>
        </div>
      )}

      <div className="search-bar">
        <div className="input-group">
          <Search className="icon-left"/>
          <input className="input with-icon-left" placeholder="Search by code, name or class..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>

      <div className="grid grid-3">
        {filtered.map((s) => (
          <div key={s.id ?? `${s.subjectCode}-${s.className}`} className="subject-card">
            <div className="icon-wrap"><BookOpen/></div>
            <div style={{flex:1}}>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-mono text-xs muted-text">{s.subjectCode}</p>
                {s.isActive === false && <span className="badge danger">Inactive</span>}
              </div>
              <h3 style={{fontSize:"1rem"}}>{s.subjectName}</h3>
              <p className="text-xs muted-text mt-1">{s.className}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="muted-text" style={{padding:"2rem"}}>No subjects found.</p>}
      </div>
    </div>
  );
};
export default SubjectsPage;
