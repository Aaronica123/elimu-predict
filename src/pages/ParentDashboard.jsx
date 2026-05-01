import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { 
  GraduationCap, TrendingUp, BookOpen, AlertTriangle, 
  Lightbulb, Calendar, ChevronRight, User, School,
  Activity, Target, Award, Brain, Eye, ListTodo
} from "lucide-react";
import StatCard from "@/components/StatCard";

const ParentDashboardPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [term, setTerm] = useState("TERM_1");
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear());
  const [selectedChild, setSelectedChild] = useState(null);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const response = await api.parentChildren(term, academicYear);
      setChildren(Array.isArray(response) ? response : []);
      
      // Auto-select first child if available
      if (response && response.length > 0 && !selectedChild) {
        setSelectedChild(response[0]);
      }
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

  const getRiskBadgeClass = (riskLevel) => {
    if (riskLevel === "HIGH") return "danger";
    if (riskLevel === "MEDIUM") return "warning";
    return "success";
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Parent Dashboard</h1>
          <p className="subtitle">Loading your children's data...</p>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Parent Dashboard</h1>
          <p className="subtitle text-danger">{error}</p>
        </div>
        <button className="btn btn-primary" onClick={fetchChildren}>Retry</button>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Parent Dashboard</h1>
          <p className="subtitle">Welcome to Elimu-Predict Parent Portal</p>
        </div>
        <div className="card text-center">
          <div className="card-content py-12">
            <GraduationCap size={64} className="mx-auto mb-4 text-muted" />
            <h2 className="text-xl font-bold mb-2">No Children Linked Yet</h2>
            <p className="text-muted mb-4">
              You don't have any children linked to your account. 
              Please contact the school IT department to link your children.
            </p>
            <div className="text-sm text-muted">
              <p>Contact: it@elimu-predict.com or visit the school IT office</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedChildData = selectedChild || children[0];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Parent Dashboard</h1>
        <p className="subtitle">Track your children's academic progress with AI-powered insights</p>
      </div>

      {/* Term and Year Selector */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex gap-2">
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
        <Link to="/parent-children" className="btn btn-outline btn-sm">
          <User size={14} /> View All Children ({children.length})
        </Link>
      </div>

      {/* Children Quick Select */}
      {children.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {children.map((child) => (
            <button
              key={child.admissionNumber}
              onClick={() => setSelectedChild(child)}
              className={`px-4 py-2 rounded-lg border transition ${
                selectedChild?.admissionNumber === child.admissionNumber
                  ? "bg-primary text-white border-primary"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <GraduationCap size={16} />
                <span className="text-sm font-medium">{child.fullName.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Child Overview */}
      {selectedChildData && (
        <>
          {/* Child Header */}
          <div className="card mb-6">
            <div className="card-content">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedChildData.fullName}</h2>
                    <p className="text-sm muted-text">
                      {selectedChildData.className} • {selectedChildData.admissionNumber}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={12} className="muted-text" />
                      <span className="text-xs muted-text">{term} {academicYear}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link 
                    to={`/parent/child/${selectedChildData.admissionNumber}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Eye size={14} /> Full Profile
                  </Link>
                  <Link 
                    to={`/parent/child/${selectedChildData.admissionNumber}/suggestions`}
                    className="btn btn-outline btn-sm"
                  >
                    <Lightbulb size={14} /> AI Suggestions
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats from selected child's data */}
          {selectedChildData.performance && (
            <div className="grid grid-4 gap-4 mb-6">
              <StatCard 
                label="Overall Average" 
                value={`${selectedChildData.performance.overallGrade || '-'} (${(selectedChildData.performance.totalMarksObtained || 0).toFixed(0)}%)`}
                icon={TrendingUp}
                variant="primary"
              />
              <StatCard 
                label="Class Position" 
                value={`${selectedChildData.performance.classPosition || '-'}/${selectedChildData.performance.totalStudents || '-'}`}
                icon={Award}
                variant={selectedChildData.performance.classPosition <= 10 ? "success" : "warning"}
              />
              <StatCard 
                label="Subjects" 
                value={selectedChildData.analysis?.subjectRiskSummaries?.length || 0}
                icon={BookOpen}
                variant="info"
              />
              <StatCard 
                label="Risk Level" 
                value={selectedChildData.analysis?.overallRiskLevel || 'Unknown'}
                icon={AlertTriangle}
                variant={getRiskBadgeClass(selectedChildData.analysis?.overallRiskLevel)}
              />
            </div>
          )}

          {/* Best & Worst Subjects */}
          {selectedChildData.performance && (
            <div className="grid grid-2 gap-6 mb-6">
              {selectedChildData.performance.bestSubject && (
                <div className="card success-tint">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs muted-text">🌟 Best Subject</p>
                        <p className="text-lg font-bold">{selectedChildData.performance.bestSubject}</p>
                      </div>
                      <p className="text-2xl font-bold text-success">
                        {selectedChildData.performance.bestSubjectMean?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {selectedChildData.performance.worstSubject && (
                <div className="card danger-tint">
                  <div className="card-content">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs muted-text">⚠️ Needs Improvement</p>
                        <p className="text-lg font-bold">{selectedChildData.performance.worstSubject}</p>
                      </div>
                      <p className="text-2xl font-bold text-danger">
                        {selectedChildData.performance.worstSubjectMean?.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subject Performance Preview */}
          {selectedChildData.analysis?.subjectRiskSummaries && (
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="card-title flex items-center gap-2">
                  <Target size={18} /> Subject Performance Overview
                </h2>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {selectedChildData.analysis.subjectRiskSummaries.slice(0, 4).map((subject, idx) => (
                    <div key={idx} className="border-b last:border-0 pb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{subject.subjectName}</span>
                        <span className={`badge ${getRiskBadgeClass(subject.riskLevel)}`}>
                          {subject.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="muted-text">Score: {subject.currentTermMean?.toFixed(1)}%</span>
                        <span className={subject.markChange >= 0 ? 'text-success' : 'text-danger'}>
                          {subject.markChange >= 0 ? '↑' : '↓'} {Math.abs(subject.markChange || 0).toFixed(1)}%
                        </span>
                      </div>
                      <div className="bar mt-1">
                        <div 
                          className={`bar-fill ${subject.riskLevel === 'HIGH' ? 'danger' : subject.riskLevel === 'MEDIUM' ? 'warning' : 'success'}`}
                          style={{ width: `${subject.currentTermMean || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedChildData.analysis.subjectRiskSummaries.length > 4 && (
                  <div className="mt-3 text-center">
                    <Link 
                      to={`/parent/child/${selectedChildData.admissionNumber}`}
                      className="btn btn-outline btn-sm"
                    >
                      View All {selectedChildData.analysis.subjectRiskSummaries.length} Subjects <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Summary Preview */}
          {selectedChildData.analysis?.parentSummary && (
            <div className="card primary-tint">
              <div className="card-header">
                <h2 className="card-title flex items-center gap-2">
                  <Brain size={18} /> AI Insight Summary
                </h2>
              </div>
              <div className="card-content">
                <p className="text-sm">{selectedChildData.analysis.parentSummary.substring(0, 200)}...</p>
                {selectedChildData.analysis.highRiskSubjects?.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-bold text-danger flex items-center gap-1">
                      <AlertTriangle size={12} />
                      High Risk Subjects: {selectedChildData.analysis.highRiskSubjects.join(', ')}
                    </p>
                  </div>
                )}
                <Link 
                  to={`/parent/child/${selectedChildData.admissionNumber}/suggestions`}
                  className="btn btn-link btn-sm mt-3 p-0"
                >
                  View Full AI Recommendations →
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Quick Action Cards */}
      <div className="grid grid-3 gap-4 mt-6">
        <Link to="/parent-children" className="card hover:shadow-lg transition-all">
          <div className="card-content text-center">
            <GraduationCap size={32} className="mx-auto mb-2 text-primary" />
            <h3 className="font-bold">All Children</h3>
            <p className="text-xs muted-text">View all {children.length} children</p>
          </div>
        </Link>
        <Link to="/my-child" className="card hover:shadow-lg transition-all">
          <div className="card-content text-center">
            <TrendingUp size={32} className="mx-auto mb-2 text-primary" />
            <h3 className="font-bold">Academic Progress</h3>
            <p className="text-xs muted-text">Track performance trends</p>
          </div>
        </Link>
        {selectedChildData && (
          <Link to={`/parent/child/${selectedChildData.admissionNumber}/suggestions`} className="card hover:shadow-lg transition-all">
            <div className="card-content text-center">
              <Lightbulb size={32} className="mx-auto mb-2 text-warning" />
              <h3 className="font-bold">AI Suggestions</h3>
              <p className="text-xs muted-text">Get personalized recommendations</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ParentDashboardPage;