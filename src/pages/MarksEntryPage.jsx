import { useState } from "react";
import { toast } from "@/lib/toast";
const MarksEntryPage = () => {
    const [formData, setFormData] = useState({
        admissionNumber: "", subjectId: "", marksObtained: "",
        examType: "", term: "", academicYear: "2024",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Marks uploaded successfully", { description: `Marks saved for ${formData.admissionNumber}` });
    };
    return (<div className="animate-fade-in" style={{ maxWidth: "42rem" }}>
      <div className="page-header">
        <h1>Marks Entry</h1>
        <p className="subtitle">Upload student examination marks</p>
      </div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="grid grid-2">
              <div className="field">
                <label className="label">Admission Number</label>
                <input className="input" placeholder="ADM2024001" required value={formData.admissionNumber} onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}/>
              </div>
              <div className="field">
                <label className="label">Subject</label>
                <select className="select" value={formData.subjectId} onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })} required>
                  <option value="">Select subject</option>
                  <option value="1">Mathematics</option>
                  <option value="2">English</option>
                  <option value="3">Physics</option>
                  <option value="4">Chemistry</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Marks Obtained</label>
                <input className="input" type="number" min={0} max={100} placeholder="0 - 100" required value={formData.marksObtained} onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}/>
              </div>
              <div className="field">
                <label className="label">Exam Type</label>
                <select className="select" value={formData.examType} onChange={(e) => setFormData({ ...formData, examType: e.target.value })} required>
                  <option value="">Select exam type</option>
                  <option value="CAT1">CAT 1</option>
                  <option value="CAT2">CAT 2</option>
                  <option value="MID_TERM">Mid Term</option>
                  <option value="END_TERM">End Term</option>
                  <option value="MOCK">Mock</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Term</label>
                <select className="select" value={formData.term} onChange={(e) => setFormData({ ...formData, term: e.target.value })} required>
                  <option value="">Select term</option>
                  <option value="TERM_1">Term 1</option>
                  <option value="TERM_2">Term 2</option>
                  <option value="TERM_3">Term 3</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Academic Year</label>
                <input className="input" type="number" required value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}/>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <button type="submit" className="btn btn-primary">Upload Marks</button>
              <button type="reset" className="btn btn-outline" onClick={() => setFormData({ admissionNumber: "", subjectId: "", marksObtained: "", examType: "", term: "", academicYear: "2024" })}>Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};
export default MarksEntryPage;
