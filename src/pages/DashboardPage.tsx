import { useAuth } from "@/contexts/AuthContext";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, AlertTriangle, TrendingUp, BookOpen, Brain, BarChart3, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const TeacherDashboard = () => (
  <>
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <motion.div variants={item}><StatCard label="My Students" value={45} icon={GraduationCap} variant="primary" /></motion.div>
      <motion.div variants={item}><StatCard label="At-Risk Students" value={8} icon={AlertTriangle} variant="danger" trend={{ value: "2 new this week", positive: false }} /></motion.div>
      <motion.div variants={item}><StatCard label="Subjects Assigned" value={3} icon={BookOpen} variant="default" /></motion.div>
      <motion.div variants={item}><StatCard label="Pending Marks" value={12} icon={ClipboardList} variant="warning" /></motion.div>
    </motion.div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="font-heading">At-Risk Students</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Brian Otieno", subject: "Mathematics", risk: 82 },
              { name: "Faith Wambui", subject: "Physics", risk: 74 },
              { name: "Dennis Njoroge", subject: "Chemistry", risk: 71 },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.subject}</p>
                </div>
                <span className="text-sm font-bold text-destructive">{s.risk}% risk</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="font-heading">Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Uploaded CAT1 marks for Form 3A Mathematics", time: "2 hours ago" },
              { action: "AI analysis triggered for Form 3A", time: "1 day ago" },
              { action: "Uploaded END_TERM marks for Form 2B Physics", time: "3 days ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

const PrincipalDashboard = () => (
  <>
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <motion.div variants={item}><StatCard label="Total Students" value={620} icon={GraduationCap} variant="primary" /></motion.div>
      <motion.div variants={item}><StatCard label="Total Teachers" value={38} icon={Users} variant="default" /></motion.div>
      <motion.div variants={item}><StatCard label="At-Risk Students" value={47} icon={AlertTriangle} variant="danger" trend={{ value: "5% decrease", positive: true }} /></motion.div>
      <motion.div variants={item}><StatCard label="School Avg" value="64.2%" icon={TrendingUp} variant="success" trend={{ value: "+2.1%", positive: true }} /></motion.div>
    </motion.div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="font-heading">Class Performance Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { cls: "Form 1A", avg: 72, risk: 5 },
              { cls: "Form 2A", avg: 65, risk: 8 },
              { cls: "Form 3A", avg: 58, risk: 12 },
              { cls: "Form 4A", avg: 61, risk: 10 },
            ].map((c) => (
              <div key={c.cls} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{c.cls}</p>
                  <p className="text-xs text-muted-foreground">Avg: {c.avg}%</p>
                </div>
                <span className="text-xs font-medium text-destructive">{c.risk} at-risk</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="font-heading">Subject Weakness Areas</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: "Mathematics", weakness: 34 },
              { subject: "Physics", weakness: 28 },
              { subject: "Chemistry", weakness: 22 },
              { subject: "English", weakness: 15 },
            ].map((s) => (
              <div key={s.subject} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{s.subject}</span>
                  <span className="text-muted-foreground">{s.weakness}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-destructive/70 transition-all" style={{ width: `${s.weakness}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

const ParentDashboard = () => (
  <>
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <motion.div variants={item}><StatCard label="Overall Average" value="68%" icon={TrendingUp} variant="success" /></motion.div>
      <motion.div variants={item}><StatCard label="Subjects At-Risk" value={2} icon={AlertTriangle} variant="warning" /></motion.div>
      <motion.div variants={item}><StatCard label="AI Suggestions" value={3} icon={Brain} variant="primary" /></motion.div>
    </motion.div>
    <Card>
      <CardHeader><CardTitle className="font-heading">My Child's Performance — Brian Otieno</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { subject: "Mathematics", score: 45, risk: "HIGH" },
            { subject: "English", score: 72, risk: "LOW" },
            { subject: "Physics", score: 52, risk: "MEDIUM" },
            { subject: "Chemistry", score: 68, risk: "LOW" },
          ].map((s) => (
            <div key={s.subject} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-sm text-foreground">{s.subject}</p>
                <p className="text-xs text-muted-foreground">Score: {s.score}%</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                s.risk === "HIGH" ? "bg-destructive/10 text-destructive" :
                s.risk === "MEDIUM" ? "bg-warning/10 text-warning" :
                "bg-success/10 text-success"
              }`}>
                {s.risk}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </>
);

const AdminDashboard = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <motion.div variants={item}><StatCard label="Total Users" value={76} icon={Users} variant="primary" /></motion.div>
    <motion.div variants={item}><StatCard label="Active Sessions" value={23} icon={TrendingUp} variant="success" /></motion.div>
    <motion.div variants={item}><StatCard label="Audit Events Today" value={142} icon={BarChart3} variant="default" /></motion.div>
    <motion.div variants={item}><StatCard label="Inactive Accounts" value={4} icon={AlertTriangle} variant="warning" /></motion.div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const greetingTime = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
          {greetingTime}, {user.fullName.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">Here's your overview for today</p>
      </div>

      {(user.role === "TEACHER") && <TeacherDashboard />}
      {(user.role === "PRINCIPAL" || user.role === "DEPUTY_PRINCIPAL") && <PrincipalDashboard />}
      {user.role === "SENIOR_TEACHER" && <PrincipalDashboard />}
      {user.role === "PARENT" && <ParentDashboard />}
      {(user.role === "ADMIN" || user.role === "IT_HANDLER") && <AdminDashboard />}
    </div>
  );
};

export default DashboardPage;
