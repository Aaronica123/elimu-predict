import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { GraduationCap, Loader2, AlertCircle, TrendingUp, BookOpen } from "lucide-react";
import StatCard from "@/components/StatCard";

const MyChildPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("TERM_1");
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [selectedChild, setSelectedChild] = useState(null);

  const fetchChildren = async () => {
    setLoading(true);
    setError("");
    try { 
      const response = await api.parentChildren(term, academicYear);
      setItems(Array.isArray(response) ? response : []);
    } catch (e) { 
      setError(e.message); 
      console.error("Failed to fetch children:", e);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [term, academicYear]);

  if (loading) {
    return (
      <div className="page-header">
        <h1>My Child's Progress</h1>
        <p className="subtitle"><Loader2 className="animate-spin"/> Loading children data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header">
        <h1>My Child's Progress</h1>
        <p className="subtitle" style={{color:"hsl(var(--destructive))"}}>
          <AlertCircle className="inline mr-2" size={16}/>
          {error}
        </p>
      </div>
    );
  }

  // If a child is selected, show detailed view
  if (selectedChild) {
    return (
      <ChildDetailView 
        child={selectedChild} 
        onBack={() => setSelectedChild(null)}
        term={term}
        academicYear={academicYear}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>My Child's Progress</h1>
        <p className="subtitle">Tap a child to view their full performance, analysis and suggestions.</p>
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

      <div className="grid grid-2 gap-6">
        {items.map((c) => (
          <div key={c.admissionNumber} className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedChild(c)}>
            <div className="card-content">
              <div className="flex items-center gap-3 mb-3">
                <div style={{width:"3rem",height:"3rem",borderRadius:"9999px",background:"hsl(var(--primary)/0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <GraduationCap style={{color:"hsl(var(--primary))"}} size={24}/>
                </div>
                <div>
                  <h2 style={{fontSize:"1.125rem"}}>{c.fullName}</h2>
                  <p className="text-sm muted-text">{c.className}</p>
                  <p className="text-xs mono">{c.admissionNumber}</p>
                </div>
              </div>
              
              {/* Quick stats from performance if available */}
              {c.performance && (
                <div className="grid grid-3 gap-2 mb-3 text-center">
                  <div>
                    <p className="text-xs muted-text">Avg Score</p>
                    <p className="text-sm font-bold">{c.performance.overallGrade || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs muted-text">Class Pos</p>
                    <p className="text-sm font-bold">{c.performance.classPosition || '-'}/{c.performance.totalStudents || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs muted-text">Risk Level</p>
                    <span className={`badge ${c.analysis?.overallRiskLevel === 'HIGH' ? 'danger' : c.analysis?.overallRiskLevel === 'MEDIUM' ? 'warning' : 'success'} text-xs`}>
                      {c.analysis?.overallRiskLevel || 'Unknown'}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <button className="btn btn-primary btn-sm flex-1" onClick={(e) => { e.stopPropagation(); setSelectedChild(c); }}>
                  View Profile
                </button>
                <Link className="btn btn-outline btn-sm" to={`/parent/child/${c.admissionNumber}/suggestions`} onClick={(e) => e.stopPropagation()}>
                  Suggestions
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="card col-span-2">
            <div className="card-content text-center">
              <GraduationCap size={48} className="mx-auto mb-3 muted-text" />
              <p className="muted-text">No children are linked to your account yet.</p>
              <p className="text-xs muted-text mt-2">Please contact the school IT department to link your children.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Child Detail View Component
const ChildDetailView = ({ child, onBack, term, academicYear }) => {
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetailedData = async () => {
      setLoading(true);
      try {
        const data = await api.parentChild(child.admissionNumber, term, academicYear);
        setDetailedData(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch child details:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailedData();
  }, [child.admissionNumber, term, academicYear]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="animate-spin mx-auto mb-3" size={32} />
        <p>Loading child's performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card danger-tint">
        <div className="card-content text-center">
          <AlertCircle className="mx-auto mb-3 text-danger" size={32} />
          <p className="text-danger">{error}</p>
          <button className="btn btn-outline mt-3" onClick={onBack}>Go Back</button>
        </div>
      </div>
    );
  }

  const data = detailedData || child;
  const p = data.performance || {};
  const a = data.analysis || {};
  const ab = data.assessmentBreakDown || {};

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <button className="btn btn-outline btn-sm mb-2" onClick={onBack}>
          ← Back to Children
        </button>
        <h1>{data.fullName}</h1>
        <p className="subtitle">{data.className} • {data.term || term} {data.academicYear || academicYear} • {data.admissionNumber}</p>
      </div>

      {/* Performance Stats Cards */}
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
          variant={p.overallGrade === 'A' ? "success" : p.overallGrade === 'B' ? "primary" : "warning"}
        />
        <StatCard 
          label="Class Position" 
          value={`${p.classPosition || '-'} / ${p.totalStudents || '-'}`} 
          icon={GraduationCap}
          variant={p.classPosition <= 10 ? "success" : "warning"}
        />
        <StatCard 
          label="Performance Band" 
          value={p.performanceBand || "—"} 
          icon={TrendingUp}
          variant={p.performanceBand === 'Excellent' ? "success" : p.performanceBand === 'Good' ? "primary" : "warning"}
        />
      </div>

      {/* Best & Worst Subjects */}
      <div className="grid grid-2 gap-6 mb-6">
        {p.bestSubject && (
          <div className="card success-tint">
            <div className="card-header">
              <h3 className="card-title text-success">🌟 Best Subject</h3>
            </div>
            <div className="card-content">
              <p className="text-xl font-bold">{p.bestSubject}</p>
              <p className="text-2xl font-bold text-success">{p.bestSubjectMean?.toFixed(1)}%</p>
            </div>
          </div>
        )}
        {p.worstSubject && (
          <div className="card danger-tint">
            <div className="card-header">
              <h3 className="card-title text-danger">⚠️ Needs Improvement</h3>
            </div>
            <div className="card-content">
              <p className="text-xl font-bold">{p.worstSubject}</p>
              <p className="text-2xl font-bold text-danger">{p.worstSubjectMean?.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Parent Summary */}
      {a.parentSummary && (
        <div className="card primary-tint mb-6">
          <div className="card-content">
            <h3 className="font-bold mb-2 flex items-center gap-2">🤖 AI Parent Summary</h3>
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

      {/* High Risk Subjects Warning */}
      {a.highRiskSubjects?.length > 0 && (
        <div className="card danger-tint mt-4">
          <div className="card-content">
            <p className="text-sm font-bold text-danger">⚠️ High Risk Subjects: {a.highRiskSubjects.join(', ')}</p>
            <p className="text-xs mt-1">These subjects require immediate attention. Review the suggestions tab for detailed recommendations.</p>
            <Link className="btn btn-outline btn-sm mt-2" to={`/parent/child/${data.admissionNumber}/suggestions`}>
              View Recommendations →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChildPage;