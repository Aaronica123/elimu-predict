import { Search, GraduationCap } from "lucide-react";
import { useState } from "react";
import AddStudentDialog from "@/components/AddStudentDialog";
import { useAuth } from "@/contexts/AuthContext";
const MOCK_STUDENTS = [
    { admissionNo: "ADM2024001", fullName: "Brian Otieno", className: "Form 3A", stream: "East" },
    { admissionNo: "ADM2024002", fullName: "Faith Wambui", className: "Form 3A", stream: "West" },
    { admissionNo: "ADM2024003", fullName: "Dennis Njoroge", className: "Form 2A", stream: "East" },
    { admissionNo: "ADM2024004", fullName: "Grace Muthoni", className: "Form 1B", stream: null },
    { admissionNo: "ADM2024005", fullName: "Kevin Kiprop", className: "Form 4A", stream: "East" },
];
const StudentsPage = () => {
    const [search, setSearch] = useState("");
    const { hasRole } = useAuth();
    const filtered = MOCK_STUDENTS.filter((s) => s.fullName.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase()));
    return (<div className="animate-fade-in">
      <div className="row-between mb-6">
        <div>
          <h1>Students</h1>
          <p className="subtitle">Manage student records</p>
        </div>
        {hasRole(["IT_HANDLER", "ADMIN"]) && <AddStudentDialog />}
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
                {filtered.map((s) => (<tr key={s.admissionNo}>
                    <td className="mono">{s.admissionNo}</td>
                    <td>
                      <span className="flex items-center gap-2">
                        <GraduationCap style={{ width: "1rem", height: "1rem", color: "hsl(var(--primary))" }}/>
                        {s.fullName}
                      </span>
                    </td>
                    <td>{s.className}</td>
                    <td className="muted-text">{s.stream || "—"}</td>
                  </tr>))}
                {filtered.length === 0 && (<tr><td colSpan={4} className="text-center muted-text" style={{ padding: "2rem" }}>No students found</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>);
};
export default StudentsPage;
