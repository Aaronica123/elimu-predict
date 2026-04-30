import { useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";
import { Upload } from "lucide-react";

const SAMPLE = `[
  { "admissionNumber":"ADM2024001","subjectCode":"MATH101","marksObtained":72,"examType":"CAT_1","term":"TERM_1","academicYear":2025 }
]`;

const BulkMarksPage = () => {
  const [text, setText] = useState(SAMPLE);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    let records;
    try { records = JSON.parse(text); if (!Array.isArray(records)) throw new Error("Must be a JSON array"); }
    catch (err) { toast.error("Invalid JSON: " + err.message); return; }
    setLoading(true);
    try {
      const resp = await api.bulkUploadMarks(records);
      toast.success(`Uploaded ${records.length} record(s)`);
      console.log("Bulk upload response", resp);
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="animate-fade-in" style={{maxWidth:"56rem"}}>
      <div className="page-header">
        <h1>Bulk Marks Upload</h1>
        <p className="subtitle">Paste a JSON array of mark records</p>
      </div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={submit}>
            <div className="field">
              <label className="label">Records (JSON)</label>
              <textarea className="input" rows={16} style={{fontFamily:"monospace", fontSize:"0.85rem"}} value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="flex gap-3 mt-3">
              <button type="submit" className="btn btn-primary" disabled={loading}><Upload/> {loading ? "Uploading…" : "Upload Bulk"}</button>
              <button type="button" className="btn btn-outline" onClick={() => setText(SAMPLE)}>Reset Sample</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default BulkMarksPage;
