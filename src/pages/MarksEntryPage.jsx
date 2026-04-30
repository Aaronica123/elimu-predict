import { useState } from "react";
import { toast } from "@/lib/toast";
import api from "../lib/api";
// const ADMISSION_RE = /^[A-Z]{2,4}\d{3,8}$/;
// const DIGITS_ONLY_RE = /^\d+$/;

// const validate = (data) => {
//     const errors = {};
//     if (!ADMISSION_RE.test(data.admissionNumber.trim())) {
//         errors.admissionNumber = "Admission No must be letters followed by digits (e.g. ADM2024001).";
//     }
//     if (!data.subjectId) errors.subjectId = "Select a subject.";
//     if (!DIGITS_ONLY_RE.test(data.marksObtained)) {
//         errors.marksObtained = "Marks must be a whole number.";
//     } else {
//         const n = Number(data.marksObtained);
//         if (n < 0 || n > 100) errors.marksObtained = "Marks must be between 0 and 100.";
//     }
//     if (!data.examType) errors.examType = "Select an exam type.";
//     if (!data.term) errors.term = "Select a term.";
//     if (!DIGITS_ONLY_RE.test(data.academicYear) || data.academicYear.length !== 4) {
//         errors.academicYear = "Year must be a 4-digit number.";
//     } else {
//         const y = Number(data.academicYear);
//         const cur = new Date().getFullYear();
//         if (y < 2000 || y > cur + 1) errors.academicYear = `Year must be between 2000 and ${cur + 1}.`;
//     }
//     return errors;
// };

const MarksEntryPage = () => {
    const initial = { admissionNumber: "", subjectId: "", marksObtained: "", examType: "", term: "", academicYear: "" };
    const [formData, setFormData] = useState(initial);
    const [errors, setErrors] = useState({});

    const set = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
    // const setDigits = (field, value) => set(field, value.replace(/\D/g, ""));
    const d=new Date()
    const y=d.getFullYear()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        // const errs = validate(formData);
        // setErrors(errs);
        // if (Object.keys(errs).length > 0) {
        //     toast.error("Please fix the highlighted errors");
        //     return;
        // }
        try{
          alert(formData.academicYear+"admission is"+formData.admissionNumber+
            "exam is"+formData.examType+"subject id is"+formData.subjectId+
            "term is"+formData.term+"marks are"+formData.marksObtained)
parseInt(formData.academicYear)
parseFloat(formData.marksObtained)
            if (isNaN(formData.marksObtained) || isNaN(formData.academicYear)) {
        alert("Please ensure Marks and Academic Year are valid numbers.");
        return;
    }
        //   const resp=await api.post('/marks',{
        //   "admissionNumber":formData.admissionNumber,
        //   "academicYear":parseInt(formData.academicYear),
        //   "examType":formData.examType,
        //   "marksObtained":parseFloat(formData.marksObtained),
        //   "subjectCode":formData.subjectId,
        //   "term":formData.term
        // })
        const resp=await api.post('/marks',{
          "admissionNumber":formData.admissionNumber,
          "academicYear":parseInt(formData.academicYear),
          "examType":formData.examType,
          "marksObtained":parseFloat(formData.marksObtained),
          "subjectCode":formData.subjectId,
          "term":formData.term
        })
        
        alert("success")
        
        toast.success("Marks uploaded successfully", { description: `Marks saved for ${resp.admissionNumber}` });
        }
        catch(error){
          alert (error.message)
        }
        

        
    };

    const errStyle = { color: "hsl(var(--destructive))", fontSize: "0.75rem", marginTop: "0.25rem" };

    return (<div className="animate-fade-in" style={{ maxWidth: "42rem" }}>
      <div className="page-header">
        <h1>Marks Entry</h1>
        <p className="subtitle">Upload student examination marks</p>
      </div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="grid grid-2">
              <div className="field">
                <label className="label">Admission Number</label>
                <input className="input" placeholder="ADM2024001" required value={formData.admissionNumber} onChange={(e) => set("admissionNumber", e.target.value.toUpperCase())} maxLength={12}/>
                {errors.admissionNumber && <p style={errStyle}>{errors.admissionNumber}</p>}
              </div>
              <div className="field">
                <label className="label">Subject</label>
                <select className="select" value={formData.subjectId} onChange={(e) => set("subjectId", e.target.value)} required>
                  <option value="">Select subject</option>
                  <option value="MATH101">Mathematics</option>
                  <option value="ENG101">English</option>
                  <option value="PHY101">Physics</option>
                  <option value="CHEM101">Chemistry</option>
                </select>
                {errors.subjectId && <p style={errStyle}>{errors.subjectId}</p>}
              </div>
              <div className="field">
                <label className="label">Marks Obtained</label>
                <input className="input" type="number" inputMode="decimal" step="0.01" 
                placeholder="0 - 100" 
                required value={formData.marksObtained}
                 onChange={(e) => set("marksObtained", e.target.value)} maxLength={4}/>
                {errors.marksObtained && <p style={errStyle}>{errors.marksObtained}</p>}
              </div>
              <div className="field">
                <label className="label">Exam Type</label>
                <select className="select" value={formData.examType} onChange={(e) => set("examType", e.target.value)} required>
                  <option value="">Select exam type</option>
                  <option value="CAT_1">CAT 1</option>
                  <option value="CAT_2">CAT 2</option>
                  <option value="EXAM_1">Exam 1</option>
                  <option value="EXAM_2">End Term</option>
                  <option value="EXAM_3">Mock</option>
                </select>
                {errors.examType && <p style={errStyle}>{errors.examType}</p>}
              </div>
              <div className="field">
                <label className="label">Term</label>
                <select className="select" value={formData.term} onChange={(e) => set("term", e.target.value)} required>
                  <option value="">Select term</option>
                  <option value="TERM_1">Term 1</option>
                  <option value="TERM_2">Term 2</option>
                  <option value="TERM_3">Term 3</option>
                </select>
                {errors.term && <p style={errStyle}>{errors.term}</p>}
              </div>
              <div className="field">
                <label className="label">Academic Year</label>
                <input className="input" inputMode="numeric"pattern="\d*" required value={formData.academicYear} onChange={(e) => set("academicYear", e.target.value)} maxLength={4}/>
                {errors.academicYear && <p style={errStyle}>{errors.academicYear}</p>}
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-primary">Upload Marks</button>
              <button type="reset" className="btn btn-outline" onClick={() => { setFormData(initial); setErrors({}); }}>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};
export default MarksEntryPage;
