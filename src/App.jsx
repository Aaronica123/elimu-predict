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
import AiAnalysisPage from "@/pages/AiAnalysisPage";
import ReportsPage from "@/pages/ReportsPage";
import RegisterUsersPage from "@/pages/RegisterUsersPage";
import UserManagementPage from "@/pages/UserManagementPage";
import AuditLogsPage from "@/pages/AuditLogsPage";
import MyChildPage from "@/pages/MyChildPage";
import NotFound from "@/pages/NotFound";
const App = () => (<AuthProvider>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<Navigate to="/dashboard" replace/>}/>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/students" element={<StudentsPage />}/>
              <Route path="/subjects" element={<SubjectsPage />}/>
              <Route path="/reports" element={<ReportsPage />}/>
              <Route path="/ai-analysis" element={<AiAnalysisPage />}/>
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/marks" element={<MarksEntryPage />}/>
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["IT_HANDLER"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/register-users" element={<RegisterUsersPage />}/>
              <Route path="/register-students" element={<StudentsPage/>}/>
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/user-management" element={<UserManagementPage />}/>
              <Route path="/role-management" element={<UserManagementPage />}/>
              <Route path="/audit-logs" element={<AuditLogsPage />}/>
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["PARENT"]}/>}>
            <Route element={<AppLayout />}>
              <Route path="/my-child" element={<MyChildPage />}/>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </AuthProvider>);
export default App;
