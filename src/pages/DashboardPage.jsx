import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/StatCard";
import { Users, GraduationCap, AlertTriangle, TrendingUp, BookOpen, Brain, BarChart3, ClipboardList } from "lucide-react";
const TeacherDashboard = () => (<>
    <div className="grid grid-4 mb-8">
      <StatCard label="My Students" value={45} icon={GraduationCap} variant="primary"/>
      <StatCard label="At-Risk Students" value={8} icon={AlertTriangle} variant="danger" trend={{ value: "2 new this week", positive: false }}/>
      <StatCard label="Subjects Assigned" value={3} icon={BookOpen}/>
      <StatCard label="Pending Marks" value={12} icon={ClipboardList} variant="warning"/>
    </div>
    <div className="grid grid-2 gap-6">
      <div className="card">
        <div className="card-header"><h2 className="card-title">At-Risk Students</h2></div>
        <div className="card-content">
          {[
        { name: "Brian Otieno", subject: "Mathematics", risk: 82 },
        { name: "Faith Wambui", subject: "Physics", risk: 74 },
        { name: "Dennis Njoroge", subject: "Chemistry", risk: 71 },
    ].map((s) => (<div key={s.name} className="list-row">
              <div>
                <p className="name">{s.name}</p>
                <p className="meta">{s.subject}</p>
              </div>
              <span className="accent">{s.risk}% risk</span>
            </div>))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h2 className="card-title">Recent Activity</h2></div>
        <div className="card-content">
          {[
        { action: "Uploaded CAT1 marks for Form 3A Mathematics", time: "2 hours ago" },
        { action: "AI analysis triggered for Form 3A", time: "1 day ago" },
        { action: "Uploaded END_TERM marks for Form 2B Physics", time: "3 days ago" },
    ].map((a, i) => (<div key={i} className="timeline-row">
              <div className="bullet"/>
              <div>
                <p>{a.action}</p>
                <p>{a.time}</p>
              </div>
            </div>))}
        </div>
      </div>
    </div>
  </>);
const PrincipalDashboard = () => (<>
    <div className="grid grid-4 mb-8">
      <StatCard label="Total Students" value={620} icon={GraduationCap} variant="primary"/>
      <StatCard label="Total Teachers" value={38} icon={Users}/>
      <StatCard label="At-Risk Students" value={47} icon={AlertTriangle} variant="danger" trend={{ value: "5% decrease", positive: true }}/>
      <StatCard label="School Avg" value="64.2%" icon={TrendingUp} variant="success" trend={{ value: "+2.1%", positive: true }}/>
    </div>
    <div className="grid grid-2 gap-6">
      <div className="card">
        <div className="card-header"><h2 className="card-title">Class Performance Overview</h2></div>
        <div className="card-content">
          {[
        { cls: "Form 1A", avg: 72, risk: 5 },
        { cls: "Form 2A", avg: 65, risk: 8 },
        { cls: "Form 3A", avg: 58, risk: 12 },
        { cls: "Form 4A", avg: 61, risk: 10 },
    ].map((c) => (<div key={c.cls} className="list-row">
              <div>
                <p className="name">{c.cls}</p>
                <p className="meta">Avg: {c.avg}%</p>
              </div>
              <span className="accent">{c.risk} at-risk</span>
            </div>))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h2 className="card-title">Subject Weakness Areas</h2></div>
        <div className="card-content">
          {[
        { subject: "Mathematics", weakness: 34 },
        { subject: "Physics", weakness: 28 },
        { subject: "Chemistry", weakness: 22 },
        { subject: "English", weakness: 15 },
    ].map((s) => (<div key={s.subject} className="bar-row">
              <div className="labels">
                <span className="name">{s.subject}</span>
                <span className="value">{s.weakness}%</span>
              </div>
              <div className="bar"><div className="bar-fill danger" style={{ width: `${s.weakness}%` }}/></div>
            </div>))}
        </div>
      </div>
    </div>
  </>);
const ParentDashboard = () => (<>
    <div className="grid grid-3 mb-8">
      <StatCard label="Overall Average" value="68%" icon={TrendingUp} variant="success"/>
      <StatCard label="Subjects At-Risk" value={2} icon={AlertTriangle} variant="warning"/>
      <StatCard label="AI Suggestions" value={3} icon={Brain} variant="primary"/>
    </div>
    <div className="card">
      <div className="card-header"><h2 className="card-title">My Child's Performance — Brian Otieno</h2></div>
      <div className="card-content">
        {[
        { subject: "Mathematics", score: 45, risk: "HIGH" },
        { subject: "English", score: 72, risk: "LOW" },
        { subject: "Physics", score: 52, risk: "MEDIUM" },
        { subject: "Chemistry", score: 68, risk: "LOW" },
    ].map((s) => (<div key={s.subject} className="list-row">
            <div>
              <p className="name">{s.subject}</p>
              <p className="meta">Score: {s.score}%</p>
            </div>
            <span className={`badge ${s.risk === "HIGH" ? "danger" : s.risk === "MEDIUM" ? "warning" : "success"}`}>
              {s.risk}
            </span>
          </div>))}
      </div>
    </div>
  </>);
const AdminDashboard = () => (<div className="grid grid-4">
    <StatCard label="Total Users" value={76} icon={Users} variant="primary"/>
    <StatCard label="Active Sessions" value={23} icon={TrendingUp} variant="success"/>
    <StatCard label="Audit Events Today" value={142} icon={BarChart3}/>
    <StatCard label="Inactive Accounts" value={4} icon={AlertTriangle} variant="warning"/>
  </div>);
const DashboardPage = () => {
    const { user } = useAuth();
    if (!user)
        return null;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    return (<div className="animate-fade-in">
      <div className="page-header">
        <h1>{greeting}, {user[0]}</h1>
        <p className="subtitle">Here's your overview for today</p>
      </div>

      {user[2]=== "TEACHER" && <TeacherDashboard />}
      {(user[2] === "PRINCIPAL" || user[2] === "DEPUTY_PRINCIPAL" || user[2] === "SENIOR_TEACHER") && <PrincipalDashboard />}
      {user[2] === "PARENT" && <ParentDashboard />}
      {(user[2] === "ADMIN" || user[2] === "IT Handler") && <AdminDashboard />}
    </div>);
};
export default DashboardPage;
