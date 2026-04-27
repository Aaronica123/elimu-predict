import { useState } from "react";
import { Search, GraduationCap, ShieldCheck, TrendingUp, TrendingDown, BookOpen } from "lucide-react";
const MOCK_CHILD = {
    admissionNo: "ADM2024001",
    fullName: "Brian Otieno",
    className: "Form 3A",
    stream: "East",
    subjects: [
        { name: "Mathematics", score: 72, grade: "B", trend: "up" },
        { name: "English", score: 65, grade: "B-", trend: "down" },
        { name: "Kiswahili", score: 78, grade: "B+", trend: "up" },
        { name: "Biology", score: 58, grade: "C+", trend: "stable" },
        { name: "Chemistry", score: 44, grade: "C-", trend: "down" },
        { name: "Physics", score: 61, grade: "B-", trend: "up" },
    ],
    overallMean: 63,
    riskLevel: "Medium",
    aiRecommendation: "Brian shows strong performance in languages but needs focused support in Chemistry. Consider extra tutorials and practice papers for science subjects.",
};
const MyChildPage = () => {
    const [searchForm, setSearchForm] = useState({ admissionNo: "", studentName: "" });
    const [verified, setVerified] = useState(false);
    const [child, setChild] = useState(null);
    const handleVerify = (e) => {
        e.preventDefault();
        setChild(MOCK_CHILD);
        setVerified(true);
    };
    const riskBadge = child?.riskLevel === "High" ? "danger" : child?.riskLevel === "Medium" ? "warning" : "success";
    return (<div className="animate-fade-in" style={{ maxWidth: "48rem" }}>
      <div className="page-header">
        <h1>My Child's Progress</h1>
        <p className="subtitle">Enter your child's details to view their academic progress. Only verified parents can access this information.</p>
      </div>

      {!verified ? (<div className="card">
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2"><ShieldCheck style={{ color: "hsl(var(--primary))" }}/> Verify Your Identity</h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="alert muted">
                For security, you must provide the student's admission number and full name.
                These must match the records linked to your account during registration.
              </div>
              <div className="field">
                <label className="label">Student Admission Number</label>
                <input className="input" required placeholder="e.g. ADM2024001" value={searchForm.admissionNo} onChange={(e) => setSearchForm({ ...searchForm, admissionNo: e.target.value })}/>
              </div>
              <div className="field">
                <label className="label">Student Full Name</label>
                <input className="input" required placeholder="e.g. Brian Otieno" value={searchForm.studentName} onChange={(e) => setSearchForm({ ...searchForm, studentName: e.target.value })}/>
              </div>
              <button type="submit" className="btn btn-primary btn-block"><Search /> Verify & View Progress</button>
            </form>
          </div>
        </div>) : child ? (<div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="card">
            <div className="card-content">
              <div className="row-between">
                <div className="flex items-center gap-3">
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", background: "hsl(var(--primary) / 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GraduationCap style={{ width: "1.5rem", height: "1.5rem", color: "hsl(var(--primary))" }}/>
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.125rem" }}>{child.fullName}</h2>
                    <p className="text-sm muted-text">{child.className} • {child.stream} Stream</p>
                    <p className="text-xs mono">{child.admissionNo}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="text-xs muted-text">Overall Mean</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{child.overallMean}%</p>
                  <span className={`badge ${riskBadge} mt-1`}>{child.riskLevel} Risk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title flex items-center gap-2"><BookOpen style={{ width: "1rem", height: "1rem", color: "hsl(var(--primary))" }}/> Subject Performance</h2>
            </div>
            <div className="card-content flush">
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th style={{ textAlign: "center" }}>Score</th>
                      <th style={{ textAlign: "center" }}>Grade</th>
                      <th style={{ textAlign: "center" }}>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {child.subjects.map((s) => (<tr key={s.name}>
                        <td>{s.name}</td>
                        <td style={{ textAlign: "center", fontWeight: 500 }}>{s.score}%</td>
                        <td style={{ textAlign: "center" }}><span className="badge outline">{s.grade}</span></td>
                        <td style={{ textAlign: "center" }}>
                          {s.trend === "up" ? <TrendingUp style={{ color: "hsl(var(--success))", margin: "0 auto", width: "1rem", height: "1rem" }}/>
                    : s.trend === "down" ? <TrendingDown style={{ color: "hsl(var(--destructive))", margin: "0 auto", width: "1rem", height: "1rem" }}/>
                        : <span className="muted-text text-xs">—</span>}
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card primary-tint">
            <div className="card-content">
              <h3 className="text-sm font-bold mb-2">🤖 AI Recommendation</h3>
              <p className="text-sm muted-text" style={{ lineHeight: 1.6 }}>{child.aiRecommendation}</p>
            </div>
          </div>

          <button className="btn btn-outline" onClick={() => { setVerified(false); setChild(null); }}>← Back to Verification</button>
        </div>) : null}
    </div>);
};
export default MyChildPage;
