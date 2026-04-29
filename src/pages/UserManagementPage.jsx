import { Shield, ShieldOff } from "lucide-react";
import { toast } from "@/lib/toast";
import api from "../lib/api";
import { useState,useEffect } from "react";

const UserManagementPage = () => {
const [user,setUser]=useState([]);
const x=async()=>{
  try{
    const resp=await api.get('/users')    
    setUser(resp)
    
  }
  catch(error){
    alert (error.message)
  }
}
useEffect(()=>{
x()
})
return(
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
              <tr>
                <th>User</th><th>ID</th><th>Role</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((u) => (<tr key={u.id}>
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
  </div>)
};
export default UserManagementPage;
