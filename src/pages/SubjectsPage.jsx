import { BookOpen, Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";
import { useAuth } from "@/contexts/AuthContext";

const SubjectsPage = () => {
  const { hasRole } = useAuth();
  const canCreate = hasRole(["ADMIN", "IT_HANDLER"]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subjectCode: "", subjectName: "", className: "" });

  const load = async () => {
    try { setItems(await api.get('/subjects')); }
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
      const resp=await api.post('/subjects',{
        "subjectCode":form.subjectCode,
        "subjectName":form.subjectName,
        "className":form.className
      });
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
              <select onChange={(e) => setForm({...form, className: e.target.value})} className="select">
                <option value="">select class</option>
                <option value="Form 1N">Form 1N</option>
                <option value="Form 1B">Form 1B</option>
                <option value="Form 2A">Form 2A</option>
                <option value="Form 2B">Form 2B</option>
                <option value="Form 3A">Form 3A</option>
                <option value="Form 3B">Form 3B</option>
                <option value="Form 4A">Form 4A</option>
                <option value="Form 4B">Form 4B</option>
                
                       
              </select>
                {/* <input className="input" required value={form.className} onChange={(e) => setForm({...form, className: e.target.value})} placeholder="Form 1A"/> */}
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
