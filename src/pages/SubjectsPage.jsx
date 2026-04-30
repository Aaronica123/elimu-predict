import { BookOpen, Search, FlaskConical, Globe, Languages, Music, Hammer } from "lucide-react";
import { useState,useEffect } from "react";
import api from "../lib/api";
const SUBJECTS = [
    { id: 1, code: "ENG101", name: "English", category: "Languages", compulsory: true },
    { id: 2, code: "KIS101", name: "Kiswahili", category: "Languages", compulsory: true },
    { id: 3, code: "MAT101", name: "Mathematics", category: "Sciences", compulsory: true },
    { id: 4, code: "PHY101", name: "Physics", category: "Sciences", compulsory: false },
    { id: 5, code: "CHE101", name: "Chemistry", category: "Sciences", compulsory: false },
    { id: 6, code: "BIO101", name: "Biology", category: "Sciences", compulsory: false },
    { id: 7, code: "HIS101", name: "History & Government", category: "Humanities", compulsory: false },
    { id: 8, code: "GEO101", name: "Geography", category: "Humanities", compulsory: false },
    { id: 9, code: "CRE101", name: "Christian Religious Education (CRE)", category: "Humanities", compulsory: false },
    { id: 10, code: "IRE101", name: "Islamic Religious Education (IRE)", category: "Humanities", compulsory: false },
    { id: 11, code: "HRE101", name: "Hindu Religious Education (HRE)", category: "Humanities", compulsory: false },
    { id: 12, code: "AGR101", name: "Agriculture", category: "Technical", compulsory: false },
    { id: 13, code: "BST101", name: "Business Studies", category: "Technical", compulsory: false },
    { id: 14, code: "CST101", name: "Computer Studies", category: "Technical", compulsory: false },
    { id: 15, code: "HME101", name: "Home Science", category: "Technical", compulsory: false },
    { id: 16, code: "ART101", name: "Art & Design", category: "Technical", compulsory: false },
    { id: 17, code: "WDW101", name: "Woodwork", category: "Technical", compulsory: false },
    { id: 18, code: "MTW101", name: "Metalwork", category: "Technical", compulsory: false },
    { id: 19, code: "BLC101", name: "Building & Construction", category: "Technical", compulsory: false },
    { id: 20, code: "PWR101", name: "Power Mechanics", category: "Technical", compulsory: false },
    { id: 21, code: "ELC101", name: "Electricity", category: "Technical", compulsory: false },
    { id: 22, code: "DND101", name: "Drawing & Design", category: "Technical", compulsory: false },
    { id: 23, code: "AVT101", name: "Aviation Technology", category: "Technical", compulsory: false },
    { id: 24, code: "MUS101", name: "Music", category: "Creative Arts", compulsory: false },
    { id: 25, code: "FRN101", name: "French", category: "Languages", compulsory: false },
    { id: 26, code: "GER101", name: "German", category: "Languages", compulsory: false },
    { id: 27, code: "ARB101", name: "Arabic", category: "Languages", compulsory: false },
    { id: 28, code: "KSL101", name: "Kenya Sign Language", category: "Languages", compulsory: false },
];
const ICONS = {
    Languages: <Languages />,
    Sciences: <FlaskConical />,
    Humanities: <Globe />,
    Technical: <Hammer />,
    "Creative Arts": <Music />,
};
const CATEGORIES = ["Languages", "Sciences", "Humanities", "Technical", "Creative Arts"];
const SubjectsPage = () => {

    //const [search, setSearch] = useState("");
    
    //const filtered = SUBJECTS.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));
    const [user,setUser]=useState([])
    const fetch=async()=>{
      try{
        const resp=await api.get('/subjects')
        const hold=resp
        setUser(hold)
      }
      catch(error){
        alert(error.message)
      }
    }
    useEffect(()=>{
      fetch()
    },[])
    return (<div className="animate-fade-in">
      <div className="page-header">
        <h1>Subjects</h1>
        <p className="subtitle">All subjects taught in Kenyan secondary schools (KCSE curriculum)</p>
      </div>

      <div className="search-bar">
        <div className="input-group">
          <Search className="icon-left"/>
          <input className="input with-icon-left" placeholder="Search subjects..." />
        </div>
      </div>
       <div className="grid grid-3">
              {user.map((s) => (<div key={s.id} className="subject-card">
                  <div className="icon-wrap"><BookOpen /></div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-mono text-xs muted-text">{s.subjectCode}</p>
                       <p className="font-mono text-xs muted-text">{s.subjectName}</p>
                        {/* <p className="font-mono text-xs muted-text">{s.teacherId}</p> */}
                         <p className="font-mono text-xs muted-text">{s.className}</p>
                      {s.compulsory && <span className="badge primary">Compulsory</span>}
                    </div>
                    <h3 style={{ fontSize: "1rem" }}>{s.name}</h3>
                  </div>
                </div>))}
            </div>
      {/* {CATEGORIES.map((category) => {
            const subjects = filtered.filter((s) => s.category === category);
            if (subjects.length === 0)
                return null;
            return (<div key={category} className="section">
            <h2>
              {ICONS[category]}
              {category}
              <span className="badge">{subjects.length}</span>
            </h2>
           
          </div>);
        })} */}

      {/* {filtered.length === 0 && (<p className="text-center muted-text" style={{ padding: "3rem 0" }}>No subjects found matching your search.</p>)} */}
    </div>);
};
export default SubjectsPage;
