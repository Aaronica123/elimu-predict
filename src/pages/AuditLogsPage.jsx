import api from "../lib/api";
import { useState,useEffect } from "react";
const AuditLogsPage = () => {

const [user,setUser]=useState([])

const fetch=async()=>{
try{
  const resp=await api.get('/admin/logs')
  setUser(resp)
  // alert("fetched")
}
catch(error){
  alert ("failed"+ error.message)


}
}

useEffect(()=>
{
  fetch()
})



return(<div className="animate-fade-in">
    <div className="page-header">
      <h1>Audit Logs</h1>
      <p className="subtitle">Complete system activity trail</p>
    </div>
    <div className="card">
      <div className="card-content flush">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Timestamp</th><th>User</th><th>Role</th><th>Action</th><th>Description</th><th>IP</th>
              </tr>
            </thead>
            <tbody>
              {user.map((l) => (<tr key={l.id}>
                  <td className="text-xs muted-text" style={{ whiteSpace: "nowrap" }}>{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="mono">{l.userId}</td>
                  <td className="text-xs muted-text">{l.userRole}</td>
                  <td className="text-xs font-bold">{l.action}</td>
                  <td className="text-xs muted-text" style={{ maxWidth: "20rem", overflow: "hidden", textOverflow: "ellipsis" }}>{l.description}</td>
                  <td className="mono">{l.ipAddress}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>);

  }
export default AuditLogsPage;
