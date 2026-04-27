import { Shield, ShieldOff } from "lucide-react";
import { toast } from "@/lib/toast";
const MOCK_USERS = [
    { id: 1, fullName: "Jane Wanjiku", userId: "TCH001", role: "TEACHER", isActive: true },
    { id: 2, fullName: "Peter Ochieng", userId: "SNR001", role: "SENIOR_TEACHER", isActive: true },
    { id: 3, fullName: "Dr. Mary Akinyi", userId: "PRC001", role: "PRINCIPAL", isActive: true },
    { id: 4, fullName: "Kevin Mwangi", userId: "ITH001", role: "IT_HANDLER", isActive: true },
    { id: 5, fullName: "Grace Atieno", userId: "PAR001", role: "PARENT", isActive: true },
    { id: 6, fullName: "James Oloo", userId: "TCH005", role: "TEACHER", isActive: false },
];
const UserManagementPage = () => (<div className="animate-fade-in">
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
              <tr>
                <th>User</th><th>ID</th><th>Role</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((u) => (<tr key={u.id}>
                  <td className="font-bold">{u.fullName}</td>
                  <td className="mono">{u.userId}</td>
                  <td><span className="badge">{u.role.replace("_", " ")}</span></td>
                  <td><span className={`badge ${u.isActive ? "success" : "danger"}`}>{u.isActive ? "Active" : "Revoked"}</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-outline btn-sm" onClick={() => toast.info("Role assignment dialog would open here")}>
                        <Shield /> Assign
                      </button>
                      <button className="btn btn-outline btn-sm danger" onClick={() => toast.info("Access revoked")}>
                        <ShieldOff /> Revoke
                      </button>
                    </div>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>);
export default UserManagementPage;
