import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/lib/toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import StudentsPage from "@/pages/StudentsPage";
import SubjectsPage from "@/pages/SubjectsPage";
import MarksEntryPage from "@/pages/MarksEntryPage";
import BulkMarksPage from "@/pages/BulkMarksPage";
import ViewMarksPage from "@/pages/ViewMarksPage";
import AiAnalysisPage from "@/pages/AiAnalysisPage";
import SmartInsightPage from "@/pages/SmartInsightPage";
import StudentResultsPage from "@/pages/StudentResultsPage";
import ReportsPage from "@/pages/ReportsPage";
import SchoolReportPage from "@/pages/SchoolReportPage";
import ClassReportPage from "@/pages/ClassReportPage";
import StudentTimelinePage from "@/pages/StudentTimelinePage";
import RegisterUsersPage from "@/pages/RegisterUsersPage";
import UserManagementPage from "@/pages/UserManagementPage";
import AuditLogsPage from "@/pages/AuditLogsPage";
import MyChildPage from "@/pages/MyChildPage";
import ParentChildrenPage from "@/pages/ParentChildrenPage";
import ParentChildProfilePage from "@/pages/ParentChildProfilePage";
import ParentSuggestionsPage from "@/pages/ParentSuggestionsPage";
import PrincipalDashboardPage from "@/pages/PrincipalDashboardPage";
import PrincipalAnalysisPage from "@/pages/PrincipalAnalysisPage";
import TeacherProfilePage from "@/pages/TeacherProfilePage";
import SubjectCardPage from "@/pages/SubjectCardPage";
import AssignmentsPage from "@/pages/AssignmentsPage";
import MyClassesPage from "@/pages/MyClassesPage";
import NotFound from "@/pages/NotFound";
import SchoolAnalysisPage from "./pages/ai/SchoolAnalysisPage";
import StudentAnalysisPage from "./pages/ai/StudentAnalysis";
import DashboardPage1 from "./pages/ai/Dash1";
import ParentDashboard from "@/pages/ParentDashboard";
//import SubjectsPage from "./pages/SubjectsPage";
// import ViewMarksPage from "@/pages/ViewMarksPage";
const App = () => (<AuthProvider>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Anyone authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/dash" element={<DashboardPage1/>}/>
              <Route path="/students" element={<StudentsPage />}/>
              <Route path="/subjects" element={<SubjectsPage />}/>
              <Route path="/reports" element={<ReportsPage />}/>
              {/* <Route path="/ai-analysis" element={<AiAnalysisPage />}/> */}
              {/* <Route path="/marks/view" element={<ViewMarksPage />}/> */}
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL"]}/>}>
            <Route element={<AppLayout />}>
              {/* <Route path="/marks" element={<MarksEntryPage />}/> */}
              <Route path="/view-marks" element={<ViewMarksPage/>}/>
              <Route path="/school-analysis" element={<SchoolAnalysisPage/>}/>
              <Route path="/student-analysis" element={<StudentAnalysisPage/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/marks" element={<MarksEntryPage />}/>
              {/* <Route path="/view-marks" element={<ViewMarksPage/>}/> */}
              {/* <Route path="/view-marks" element={<ViewMarksPage/>}/> */}
            </Route>
          </Route>
          

          <Route element={<ProtectedRoute allowedRoles={["IT_HANDLER"]}/>}>
            <Route element={<AppLayout />}>
              {/* <Route path="/register-users" element={<RegisterUsersPage />} /> */}
              <Route path="/register-students" element={<StudentsPage />} />
              <Route path="/register-subject" element={<SubjectsPage/>}/>
              <Route path="/assign-teacher" element={<AssignmentsPage/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["IT_HANDLER","ADMIN"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/register-users" element={<RegisterUsersPage />} />

              {/* <Route path="/register-students" element={<StudentsPage />} />
              <Route path="/register-subject" element={<SubjectsPage/>}/>
              <Route path="/assign-teacher" element={<AssignmentsPage/>}/> */}
            </Route>
          </Route>

          {/* Admin */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AppLayout />}>
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/role-management" element={<UserManagementPage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />
            </Route>
          </Route>

          {/* Parent Routes - FIXED */}
<Route element={<ProtectedRoute allowedRoles={["PARENT"]} />}>
  <Route element={<AppLayout />}>
    <Route path="/my-child" element={<MyChildPage />} />
    <Route path="/parent/dashboard" element={<ParentDashboard />} />
    <Route path="/parent-children" element={<ParentChildrenPage />} />
    <Route path="/parent/child/:adm" element={<ParentChildProfilePage />} />
    <Route path="/parent/child/:adm/suggestions" element={<ParentSuggestionsPage />} />
  </Route>
</Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </AuthProvider>
);

export default App;
