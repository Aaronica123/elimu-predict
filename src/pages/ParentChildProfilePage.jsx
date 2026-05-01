import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import { Loader2, AlertCircle, TrendingUp, BookOpen, GraduationCap } from "lucide-react";
import StatCard from "@/components/StatCard";

const ParentChildProfilePage = () => {
  const { adm } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("TERM_1");
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try { 
      const response = await api.parentChild(adm, term, academicYear);
      setData(response); 
    } catch (e) { 
      setError(e.message); 
      console.error("Failed to fetch child profile:", e);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (adm) {
      fetchData();
    }
  }, [adm, term, academicYear]);

  if (loading) {
    return (
      <div className="page-header text-center py-12">
        <Loader2 className="animate-spin mx-auto mb-3" size={32} />
        <h1>Child Profile</h1>
        <p className="subtitle">Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <h1>Child Profile</h1>
        <p className="subtitle" style={{color:"hsl(var(--destructive))"}}>
          <AlertCircle className="inline mr-2" size={16}/>
          {error}
        </p>
        <button className="btn btn-outline mt-3" onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  if (!data) return null;

  const p = data.performance || {};
  const a = data.analysis || {};
  const ab = data.assessmentBreakDown || {};

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <button className="btn btn-outline btn-sm mb-2" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h1>{data.fullName}</h1>
        <p className="subtitle">{data.className} • {data.term || term} {data.academicYear || academicYear} • {data.admissionNumber}</p>
      </div>

      {/* Term/Year Selector */}
      <div className="flex justify-end gap-2 mb-4">
        <select className="select" value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="TERM_1">Term 1</option>
          <option value="TERM_2">Term 2</option>
          <option value="TERM_3">Term 3</option>
        </select>
        <select className="select" value={academicYear} onChange={(e) => setAcademicYear(parseInt(e.target.value))}>
          <option>{academicYear}</option>
          <option>{academicYear - 1}</option>
          <option>{academicYear - 2}</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-4 gap-4 mb-6">
        <StatCard 
          label="Marks Obtained" 
          value={`${(p.totalMarksObtained ?? 0).toFixed(0)} / ${(p.totalMarksAvailable ?? 100).toFixed(0)}`} 
          icon={TrendingUp}
          variant="primary"
        />
        <StatCard 
          label="Overall Grade" 
          value={p.overallGrade || "—"} 
          icon={BookOpen}
        />
        <StatCard 
          label="Class Position" 
          value={`${p.classPosition || '-'} / ${p.totalStudents || '-'}`} 
          icon={GraduationCap}
        />
        <StatCard 
          label="Performance Band" 
          value={p.performanceBand || "—"} 
          icon={TrendingUp}
        />
      </div>

      {/* AI Parent Summary */}
      {a.parentSummary && (
        <div className="card primary-tint mb-6">
          <div className="card-content">
            <h3 className="font-bold mb-2">🤖 AI Parent Summary</h3>
            <p style={{lineHeight: 1.6}}>{a.parentSummary}</p>
            {a.trajectoryMessage && (
              <p className="text-sm mt-2 text-primary">{a.trajectoryMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* Subject Risk Summary */}
      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Subject Risk Summary</h2>
        </div>
        <div className="card-content flush">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Risk %</th>
                  <th>Level</th>
                  <th>Prev Mean</th>
                  <th>Current Mean</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {(a.subjectRiskSummaries || []).map((s, i) => (
                  <tr key={i}>
                    <td className="font-medium">{s.subjectName}</td>
                    <td>{(s.riskPercentage ?? 0).toFixed(1)}%</td>
                    <td>
                      <span className={`badge ${s.riskLevel === "HIGH" ? "danger" : s.riskLevel === "MEDIUM" ? "warning" : "success"}`}>
                        {s.riskLevel}
                      </span>
                    </td>
                    <td>{(s.previousTermMean ?? 0).toFixed(1)}</td>
                    <td className="font-bold">{(s.currentTermMean ?? 0).toFixed(1)}</td>
                    <td className={s.markChange >= 0 ? 'text-success' : 'text-danger'}>
                      {s.markChange >= 0 ? '+' : ''}{(s.markChange ?? 0).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assessment Breakdown */}
      {(ab.subjectAssessments?.length > 0) && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Assessment Breakdown</h2>
          </div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>CAT1</th>
                    <th>CAT2</th>
                    <th>CAT3</th>
                    <th>Exam1</th>
                    <th>Exam2</th>
                    <th>Mean</th>
                  </tr>
                </thead>
                <tbody>
                  {(ab.subjectAssessments || []).map((s, i) => (
                    <tr key={i}>
                      <td className="font-medium">{s.subjectName}</td>
                      <td>{s.cat1 ?? "—"}</td>
                      <td>{s.cat2 ?? "—"}</td>
                      <td>{s.cat3 ?? "—"}</td>
                      <td>{s.exam1 ?? "—"}</td>
                      <td>{s.exam2 ?? "—"}</td>
                      <td className="font-bold">{(s.mean ?? 0).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentChildProfilePage;