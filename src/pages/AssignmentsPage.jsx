import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";
import { Plus, ShieldOff } from "lucide-react";

const AssignmentsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", subjectCode: "", className: "" });

  const load = async () => {
    setLoading(true);
    try { setItems(await api.assignmentsAll()); }
    catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.createAssignment(form);
      toast.success("Assignment created");
      setForm({ username: "", subjectCode: "", className: "" });
      load();
    } catch (err) { toast.error(err.message); }
  };

  const revoke = async (id) => {
    if (!id) { toast.error("Missing assignment ID"); return; }
    try { await api.revokeAssignment(id); toast.success("Assignment revoked"); load(); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Teacher Assignments</h1>
        <p className="subtitle">Assign teachers to subjects and classes</p>
      </div>

      <div className="card mb-6">
        <div className="card-header"><h2 className="card-title flex items-center gap-2"><Plus/> New Assignment</h2></div>
        <div className="card-content">
          <form onSubmit={submit} className="grid grid-3 gap-3 items-end">
            <div className="field"><label className="label">Teacher Username</label>
              <input className="input" required value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} placeholder="TCH001"/>
            </div>
            <div className="field"><label className="label">Subject Code</label>
              <input className="input" required value={form.subjectCode} onChange={(e) => setForm({...form, subjectCode: e.target.value.toUpperCase()})} placeholder="MATH101"/>
            </div>
            <div className="field"><label className="label">Class</label>
              <input className="input" required value={form.className} onChange={(e) => setForm({...form, className: e.target.value})} placeholder="Form 3A"/>
            </div>
            <div><button type="submit" className="btn btn-primary">Assign</button></div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h2 className="card-title">All Assignments</h2></div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Teacher</th><th>Subject</th><th>Class</th><th>Status</th><th>Assigned</th><th>Actions</th></tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={6} className="text-center muted-text" style={{padding:"2rem"}}>Loading…</td></tr> :
                items.map((a, i) => (
                  <tr key={i}>
                    <td>{a.teacherName}</td>
                    <td>{a.subjectName}</td>
                    <td>{a.className}</td>
                    <td><span className={`badge ${a.isActive ? "success" : "danger"}`}>{a.isActive ? "Active" : "Revoked"}</span></td>
                    <td className="text-xs muted-text">{a.assignedAt && new Date(a.assignedAt).toLocaleDateString()}</td>
                    <td>{a.isActive && a.id != null && (
                      <button className="btn btn-outline btn-sm danger" onClick={() => revoke(a.id)}><ShieldOff/> Revoke</button>
                    )}</td>
                  </tr>
                ))}
                {!loading && items.length === 0 && <tr><td colSpan={6} className="text-center muted-text" style={{padding:"2rem"}}>No assignments</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignmentsPage;
