import { AlertTriangle, Lightbulb } from "lucide-react";
import api from '../lib/api';
import axios from "axios";
import { useState } from "react";
// const MOCK_ANALYSIS = [
//     { student: "Brian Otieno", admissionNo: "ADM2024001", subject: "Mathematics", riskPercentage: 82, riskLevel: "HIGH",
//         suggestion: "1. Practice 10 algebra problems daily focusing on quadratic equations.\n2. Join after-school math remedial sessions.\n3. Use visual aids and Khan Academy videos for geometry concepts." },
//     { student: "Faith Wambui", admissionNo: "ADM2024002", subject: "Physics", riskPercentage: 74, riskLevel: "HIGH",
//         suggestion: "1. Focus on understanding force diagrams before solving problems.\n2. Perform practical experiments at home with simple materials.\n3. Form a study group to discuss concepts weekly." },
//     { student: "Dennis Njoroge", admissionNo: "ADM2024003", subject: "Chemistry", riskPercentage: 55, riskLevel: "MEDIUM",
//         suggestion: "1. Create flashcards for chemical equations and reactions.\n2. Watch YouTube videos on balancing equations.\n3. Practice past papers for organic chemistry." },
// ];
const riskClass = { HIGH: "danger", MEDIUM: "warning", LOW: "success" };


const AiAnalysisPage = () => 
{

  const[admissionNumber,setadm]=useState("")
  const[term,setTerm]=useState("")
  const[academicyear,setacademicYear]=useState("")
  const [user,setUser]=useState([])
  
  const fetch=async(e)=>{
    e.preventDefault();
    alert("loading")
    const token = localStorage.getItem("token");
  try{
    alert("fetching")
    // const resp=await axios.post(`/ai/analyze/student/${admissionNumber}`,null,{
    //   params:{
    //     "term":term,
    //     "academicYear":parseInt(academicyear)
    //   },
    //   headers:{
    //     Authorization:`Bearer${token}`
    //   }
    // })
    const r=await axios.post(`/ai/analyze/student/1047?term=TERM_1&academicYear=2026`, {
    method: 'POST'
});
  // setUser(resp)
  alert("success")

  }
  
  catch(error){
   // console.error("Build Error Details:", error.response);
    alert(error.response?.status === 404 ? "Endpoint not found. Check the URL path." : error.message);
  }
}


return(
<div className="animate-fade-in">
    <div className="page-header">
      <h1>AI Analysis</h1>
      <p className="subtitle">AI-powered risk predictions and learning recommendations</p>
    </div>
    <div className="card">
        <div className="card-header">
            <div className="grid grid-2">
                <div className="field">
            <label>Admission Number</label>
          <input
            type="text"
            //placeholder="Search by admission no, student or subject..."
            value={admissionNumber}
            onChange={(e) => setadm(e.target.value)}
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
            type="number"
            //placeholder="Search by admission no, student or subject..."
            value={academicyear}
            onChange={(e) => setacademicYear(e.target.value)}
            className="input"
            style={{ width: "100%", maxWidth: 360 }}
          />
          </div>
        </div>
        <div className="flex gap-3 justify-end"><button type="button" onClick={fetch} className="btn btn-primary">
            Submit</button></div>
        </div>
        </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {user.map((a) => (<div key={a.admissionNumber} className="card">
          <div className="card-content">
            <div className="ai-card-row">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ fontSize: "1rem" }}>{a.admissionNumber}</h3>
                  <span className="text-xs font-mono muted-text">{a.trend}</span>
                  <span className={`badge ${riskClass[a.riskLevel]}`}>{a.riskLevel}</span>
                </div>
                <p className="text-sm muted-text mb-3">Subject: {a.subjectName}</p>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle style={{ width: "1rem", height: "1rem", color: "hsl(var(--destructive))", flexShrink: 0 }}/>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-2">
                      <span>Risk Score</span>
                      <span className="font-bold">{a.riskPercentage}%</span>
                    </div>
                    <div className="bar">
                      <div className={`bar-fill ${a.riskPercentage > 70 ? "danger" : a.riskPercentage > 40 ? "warning" : "success"}`} style={{ width: `${a.riskPercentage}%` }}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-suggestion">
                <div className="heading"><Lightbulb /> AI Recommendations</div>
                <p>{a.suggestion}</p>
              </div>
            </div>
          </div>
        </div>
      ))};
  </div>
  </div>
    )}
export default AiAnalysisPage; 

