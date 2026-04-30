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
  const [sub,setsubject]=useState([])
  const subject=async()=>{
    
    try{
      const resp=await api.get('/subjects')
      setsubject(resp)
    }
    catch(error){
alert(error.message)
    }
  }
  useEffect(()=>{
    subject()
  },[])
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
            <select className="select" onChange={(e) => setsubjectCode(e.target.value)}>
              <option value="">Select Option</option>
            {sub.map((e)=>(<div >
              
              <option value={e.subjectCode}>{e.subjectName}</option>
            
            </div>))}
            </select>
            
          {/* <input
            type="text"
            //placeholder="Search by admission no, student or subject..."
            value={subjectCode}
            onChange={(e) => setsubjectCode(e.target.value)}
            className="input"
            
            style={{ width: "100%", maxWidth: 360 }}
          /> */}
          </div>
          <div className="field">
          <label>term</label>
          <select onChange={(e) => setTerm(e.target.value)} className="select">
            <option value="">Select Term</option>
            <option value="TERM_1">TERM 1</option>
            <option value="TERM_2">TERM 2</option>
            <option value="TERM_3">TERM 3</option>
          </select>
          {/* <input
            type="textt"
           // placeholder="Search by admission no, student or subject..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
            style={{ width: "100%", maxWidth: 360 }}
          /> */}
          </div>
          <div className="field">
          <label>Year</label>
          <input
            type="number"
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
