import { Shield, ShieldOff, RotateCcw, Link2 } from "lucide-react";
import { toast } from "@/lib/toast";
import api from "@/lib/api";
import { useState, useEffect } from "react";

const ROLES = ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL","IT_HANDLER","ADMIN","PARENT"];

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setUsers(await api.usersAll()); }
    catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const assign = async (id) => {
    const role = window.prompt(`Assign which role?\n${ROLES.join(", ")}`);
    if (!role) return;
    if (!ROLES.includes(role.toUpperCase())) { toast.error("Unknown role"); return; }
    try { await api.assignRole(id, role.toUpperCase()); toast.success("Role assigned"); load(); }
    catch (err) { toast.error(err.message); }
  };

  const revoke = async (id) => {
    if (!window.confirm("Revoke access for this user?")) return;
    try { await api.revokeUser(id); toast.success("Access revoked"); load(); }
    catch (err) { toast.error(err.message); }
  };

  const restore = async (id) => {
    try { await api.restoreUser(id); toast.success("Access restored"); load(); }
    catch (err) { toast.error(err.message); }
  };

  const link = async (username) => {
    const adm = window.prompt("Admission number to link to this parent:");
    if (!adm) return;
    try { await api.linkParentToStudent(username, adm.trim()); toast.success("Parent linked to student"); load(); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div className="animate-fade-in">
      <div className="row-between mb-6">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">Manage roles and access for all users</p>
        </div>
      </div>
      <div className="card">
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>User</th><th>ID</th><th>Username</th><th>Role</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan={6} className="text-center muted-text" style={{padding:"2rem"}}>Loading…</td></tr> :
                users.map((u) => (
                  <tr key={u.id}>
                    <td className="font-bold">{u.fullName}</td>
                    <td className="mono">{u.id}</td>
                    <td className="mono">{u.userId}</td>
                    <td><span className="badge">{(u.role || "").replace("_", " ")}</span></td>
                    <td><span className={`badge ${u.isActive ? "success" : "danger"}`}>{u.isActive ? "Active" : "Revoked"}</span></td>
                    <td>
                      <div className="flex gap-2 flex-wrap">
                        <button className="btn btn-outline btn-sm" onClick={() => assign(u.id)}><Shield/> Assign</button>
                        {u.isActive
                          ? <button className="btn btn-outline btn-sm danger" onClick={() => revoke(u.id)}><ShieldOff/> Revoke</button>
                          : <button className="btn btn-outline btn-sm" onClick={() => restore(u.id)}><RotateCcw/> Restore</button>}
                        {u.role === "PARENT" && (
                          <button className="btn btn-outline btn-sm" onClick={() => link(u.userId)}><Link2/> Link Student</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && users.length === 0 && <tr><td colSpan={6} className="text-center muted-text" style={{padding:"2rem"}}>No users</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserManagementPage;
