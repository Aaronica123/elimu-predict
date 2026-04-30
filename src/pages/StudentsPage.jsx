import { Search, GraduationCap } from "lucide-react";
import { useState,useEffect } from "react";
import api from "../lib/api";
import AddStudentDialog from "@/components/AddStudentDialog";
import AddParentDialog from "@/components/AddParentDialog"
import { useAuth } from "@/contexts/AuthContext";

const StudentsPage = () => {
    const [search, setSearch] = useState("");
    const { hasRole } = useAuth();
    const n="1008"
    const cl="Form 1N"
    const [user,setUser]=useState([]);
    
    const fetch=async()=>{
      try{
        const fetch=await api.get(`/students/${n}`)
        const ft=await api.get(`/students/class/${cl}`)
        // alert("name is"+fetch.fullName+"and class name is"
        //   +fetch.className
        //   +"and admission number is"+fetch.admissionNumber
        // +"activity status is"+fetch.isActive)

        const f2={
          "name":ft.fullName,
          "classn":ft.className,
          "admno":ft.admissionNumber
        }
        const f1={
          "name":fetch.fullName,
          "classn":fetch.className,
          "admno":fetch.admissionNumber
        }
        
        setUser(ft)
      }
      catch(error){
        alert(error.message)
      }
    }
    useEffect(()=>{
      fetch()
    },[])
    // const filtered = user.filter((s) => s.fullName.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase()));
    return (<div className="animate-fade-in">
      <div className="row-between mb-6">
        <div>
          <h1>Students</h1>
          <p className="subtitle">Manage student records</p>
        </div>

        {hasRole(["IT_HANDLER", "ADMIN"]) && <AddStudentDialog /> }    
            {/* {hasRole(["IT_HANDLER", "ADMIN"]) && <AddParentDialog /> } */}
      </div>

      <div className="search-bar">
        <div className="input-group">
          <Search className="icon-left"/>
          <input className="input with-icon-left" placeholder="Search by name or admission no..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>

      <div className="card">
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Admission No</th>
                  <th>Full Name</th>
                  <th>Class</th>
                  <th>Stream</th>
                </tr>
              </thead>
              <tbody>
                {user.map((s) => (<tr key={s.admissionNumber}>
                    <td className="mono">{s.admissionNumber}</td>
                    <td>
                      <span className="flex items-center gap-2">
                        <GraduationCap style={{ width: "1rem", height: "1rem", color: "hsl(var(--primary))" }}/>
                        {s.fullName}
                      </span>
                    </td>
                    <td>{s.className}</td>
                    <td className="muted-text">{s.className || "—"}</td>
                  </tr>))}
                {user.length === 0 && (<tr><td colSpan={4} className="text-center muted-text" style={{ padding: "2rem" }}>No students found</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
};
export default StudentsPage;
