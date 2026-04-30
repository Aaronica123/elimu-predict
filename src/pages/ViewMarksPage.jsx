import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const ViewMarksPage = () => {
  const [marks, getMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
//   const [formdata,setForm]=useState({subjectCode:"",term:"",year:""})
  const [subjectCode,setsubjectCode]=useState("")
  const[term,setTerm]=useState("")
  const[year,setYear]=useState("")
  const [user,setUser]=useState([])



  const fetch=async(e)=>{
    e.preventDefault();
    try{
        const resp=await api.get(`/marks/class/subject/${subjectCode}/term/${term}/year/${year}`)
        setUser(resp)
        alert("marks fetched")
        // setLoading(false)
    }
    catch(error){
        alert(error.message)
    }
}

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         const res = await api.get(`/marks/student/${}`);
//         if (active) setMarks(Array.isArray(res.data) ? res.data : res.data?.content ?? []);
        
//       } catch (err) {
//         toast.error(err?.response?.data?.message || "Failed to load marks");
//       } finally {
//         if (active) setLoading(false);
//       }
//     })();
//     return () => { active = false; };
//   }, []);

//   const filtered = marks.filter((m) => {
//     const q = query.toLowerCase();
//     return (
//       String(m.admissionNumber || "").toLowerCase().includes(q) ||
//       String(m.studentName || "").toLowerCase().includes(q) ||
//       String(m.subjectName || m.subject || "").toLowerCase().includes(q)
//     );
//   });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>View Marks</h1>
        <p className="subtitle">Browse all recorded student marks</p>
      </div>

      <div className="card">
        <div className="card-header">
            <div className="grid grid-2">
                <div className="field">
            <label>subjectCode</label>
          <input
            type="text"
            //placeholder="Search by admission no, student or subject..."
            value={subjectCode}
            onChange={(e) => setsubjectCode(e.target.value)}
            className="input"
            
            style={{ width: "100%", maxWidth: 360 }}
          />
          </div>
          <div className="field">
          <label>term</label>
          <input
            type="text"
           // placeholder="Search by admission no, student or subject..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
            style={{ width: "100%", maxWidth: 360 }}
          />
          </div>
          <div className="field">
          <label>Year</label>
          <input
            type="text"
            //placeholder="Search by admission no, student or subject..."
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input"
            style={{ width: "100%", maxWidth: 360 }}
          />
          </div>
        </div>
        <div className="flex gap-3 justify-end"><button type="button" onClick={fetch} className="btn btn-primary">
            Submit</button></div>
        </div>
        <div className="card-content">
          
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Admission No</th>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Exam</th>
                    <th>Term</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((m, i) => (
                    <tr key={m.id ?? i}>
                      <td>{m.admissionNumber}</td>
                      <td>{m.subjectID ?? "-"}</td>
                      <td>{m.subjectName ?? m.subject ?? "-"}</td>
                      <td>{m.marksObtained}</td>
                      <td>{m.examType}</td>
                      <td>{m.term}</td>
                      <td>{m.academicYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default ViewMarksPage;
