import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "@/lib/toast";

const ViewMarksPage = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await api.get("/marks");
        if (active) setMarks(Array.isArray(res.data) ? res.data : res.data?.content ?? []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load marks");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const filtered = marks.filter((m) => {
    const q = query.toLowerCase();
    return (
      String(m.admissionNumber || "").toLowerCase().includes(q) ||
      String(m.studentName || "").toLowerCase().includes(q) ||
      String(m.subjectName || m.subject || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>View Marks</h1>
        <p className="subtitle">Browse all recorded student marks</p>
      </div>

      <div className="card">
        <div className="card-header">
          <input
            type="text"
            placeholder="Search by admission no, student or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input"
            style={{ width: "100%", maxWidth: 360 }}
          />
        </div>
        <div className="card-content">
          {loading ? (
            <p>Loading marks...</p>
          ) : filtered.length === 0 ? (
            <p className="meta">No marks found.</p>
          ) : (
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
                  {filtered.map((m, i) => (
                    <tr key={m.id ?? i}>
                      <td>{m.admissionNumber}</td>
                      <td>{m.studentName ?? "-"}</td>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMarksPage;
