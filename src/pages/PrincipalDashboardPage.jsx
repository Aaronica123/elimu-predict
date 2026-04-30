import { useEffect, useState } from "react";
import api from "@/lib/api";
import { TrendingUp, TrendingDown, Award, AlertTriangle, GraduationCap, BookOpen } from "lucide-react";
import StatCard from "@/components/StatCard";

const PrincipalDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setData(await api.principalDashboard()); }
      catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="page-header"><h1>Principal Dashboard</h1><p className="subtitle">Loading…</p></div>;
  if (error) return <div className="page-header"><h1>Principal Dashboard</h1><p className="subtitle" style={{color:"hsl(var(--destructive))"}}>{error}</p></div>;
  if (!data) return null;

  const trendIcon = (t) => t === "UP" || t === "IMPROVING" ? <TrendingUp style={{color:"hsl(var(--success))"}}/> : t === "DOWN" || t === "DECLINING" ? <TrendingDown style={{color:"hsl(var(--destructive))"}}/> : null;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Principal Dashboard</h1>
        <p className="subtitle">{data.term} • {data.academicYear}</p>
      </div>

      <div className="grid grid-4 mb-8">
        <StatCard label="Total Students" value={data.totalStudents} icon={GraduationCap} variant="primary"/>
        <StatCard label="Total Classes" value={data.totalClasses} icon={BookOpen}/>
        <StatCard label="Total Subjects" value={data.totalSubjects} icon={BookOpen}/>
        <StatCard label="School Mean" value={`${(data.schoolMeanAverage ?? 0).toFixed(1)}%`} icon={TrendingUp} variant="success" trend={{ value: `${data.meanChange >= 0 ? "+" : ""}${(data.meanChange ?? 0).toFixed(1)}%`, positive: data.meanChange >= 0 }}/>
      </div>

      {data.mostImprovedClass && (
        <div className="card mb-6">
          <div className="card-content">
            <div className="row-between">
              <div className="flex items-center gap-3">
                <Award style={{color:"hsl(var(--primary))"}}/>
                <div>
                  <h3>Most Improved Class — {data.mostImprovedClass.className}</h3>
                  <p className="text-sm muted-text">{data.mostImprovedClass.message}</p>
                </div>
              </div>
              <span className="badge success">+{data.mostImprovedClass.improvementPercentage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-2 gap-6">
        <div className="card">
          <div className="card-header"><h2 className="card-title">Class Rankings</h2></div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>#</th><th>Class</th><th>Mean</th><th>Grade</th><th>At-Risk</th><th>Trend</th></tr></thead>
                <tbody>
                  {(data.classRankings || []).map((c) => (
                    <tr key={c.className}>
                      <td className="font-bold">{c.rank}</td>
                      <td>{c.className}</td>
                      <td>{(c.meanAverage ?? 0).toFixed(1)}</td>
                      <td><span className="badge">{c.grade}</span></td>
                      <td>{c.highRiskCount}/{c.totalStudents}</td>
                      <td>{trendIcon(c.trend)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h2 className="card-title">Subject Rankings</h2></div>
          <div className="card-content flush">
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>#</th><th>Subject</th><th>Mean</th><th>Grade</th><th>At-Risk</th><th>Status</th></tr></thead>
                <tbody>
                  {(data.subjectRankings || []).map((s) => (
                    <tr key={s.subjectCode}>
                      <td className="font-bold">{s.rank}</td>
                      <td>{s.subjectName}</td>
                      <td>{(s.schoolWideMean ?? 0).toFixed(1)}</td>
                      <td><span className="badge">{s.grade}</span></td>
                      <td>{s.highRiskCount}/{s.totalStudents}</td>
                      <td><span className="badge">{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrincipalDashboardPage;
