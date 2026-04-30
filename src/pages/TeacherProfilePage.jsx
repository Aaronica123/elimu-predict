import { useEffect, useState } from "react";
import api from "@/lib/api";
import StatCard from "@/components/StatCard";
import { Users, BookOpen, GraduationCap, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const TeacherProfilePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.teacherProfile()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>Teacher Profile</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>Teacher Profile</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>{data.teacherName}</h1>
        <p className="subtitle">Your teaching assignments at a glance</p>
      </div>

      <div className="grid grid-3 mb-8">
        <StatCard label="Assignments" value={data.totalAssignments} icon={BookOpen} variant="primary"/>
        <StatCard label="Classes Taught" value={data.totalClassesTaught} icon={Users}/>
        <StatCard label="Students Taught" value={data.totalStudentsTaught} icon={GraduationCap}/>
      </div>

      <div className="grid grid-2 gap-6">
        {(data.subjectCards || []).map((c, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <h2 className="card-title">{c.subjectName} • {c.className}</h2>
              <p className="text-xs muted-text mono">{c.subjectCode}</p>
            </div>
            <div className="card-content">
              <div className="grid grid-2 gap-2 mb-3">
                <div><p className="text-xs muted-text">Students</p><p className="font-bold">{c.totalStudents}</p></div>
                <div><p className="text-xs muted-text">Analyzed</p><p className="font-bold">{c.analyzedStudents}</p></div>
                <div><p className="text-xs muted-text">Class Avg</p><p className="font-bold">{(c.classAverageMark ?? 0).toFixed(1)}%</p></div>
                <div><p className="text-xs muted-text">Mean Risk</p><p className="font-bold">{(c.classMeanRisk ?? 0).toFixed(1)}%</p></div>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="badge danger">{c.highRiskCount} High</span>
                <span className="badge success">{c.lowRiskCount} Low</span>
                <span className="badge">{c.subjectStatus}</span>
              </div>
              <p className="text-xs muted-text">{c.trendMessage}</p>
              <div className="mt-3">
                <Link className="btn btn-outline btn-sm" to={`/teacher/subject?code=${encodeURIComponent(c.subjectCode)}&class=${encodeURIComponent(c.className)}`}>View details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TeacherProfilePage;
