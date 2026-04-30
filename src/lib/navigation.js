import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, Brain,
  BarChart3, Shield, ScrollText, UserPlus, FileText, Lightbulb,
  PieChart, TrendingUp, Layers, UploadCloud,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL","IT_HANDLER","ADMIN","PARENT"] },

  // ----- Principal -----
  { label: "Principal Dashboard", path: "/principal/dashboard", icon: PieChart,
    roles: ["PRINCIPAL","DEPUTY_PRINCIPAL"] },
  { label: "School Analysis", path: "/principal/analysis", icon: TrendingUp,
    roles: ["PRINCIPAL","DEPUTY_PRINCIPAL"] },

  // ----- Teacher -----
  { label: "Teacher Profile", path: "/teacher/profile", icon: Layers,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "My Classes", path: "/teacher/my-classes", icon: BookOpen,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },

  // ----- Students & subjects -----
  { label: "Students", path: "/students", icon: GraduationCap,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL","IT_HANDLER","ADMIN"] },
  { label: "Subjects", path: "/subjects", icon: BookOpen,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL","ADMIN","IT_HANDLER"] },

  // ----- Marks -----
  { label: "Marks Entry", path: "/marks", icon: ClipboardList,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "Bulk Marks", path: "/marks/bulk", icon: UploadCloud,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "View Marks", path: "/view-marks", icon: ClipboardList,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL","IT_HANDLER","ADMIN","PARENT"] },

  // ----- AI -----
  { label: "AI Analysis", path: "/ai-analysis", icon: Brain,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "Smart Insight", path: "/ai/smart-insight", icon: Lightbulb,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "Student AI Results", path: "/ai/student-results", icon: Brain,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },

  // ----- Reports -----
  { label: "Reports Hub", path: "/reports", icon: BarChart3,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "School Report", path: "/reports/school", icon: BarChart3,
    roles: ["SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "Class Report", path: "/reports/class", icon: FileText,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },
  { label: "Student Timeline", path: "/reports/student-timeline", icon: TrendingUp,
    roles: ["TEACHER","SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },

  // ----- Assignments -----
  { label: "Assignments", path: "/assignments", icon: Shield,
    roles: ["SENIOR_TEACHER","DEPUTY_PRINCIPAL","PRINCIPAL"] },

  // ----- IT Handler -----
  { label: "Register Users", path: "/register-users", icon: UserPlus,
    roles: ["IT_HANDLER"] },

  // ----- Admin -----
  { label: "User Management", path: "/user-management", icon: Users, roles: ["ADMIN"] },
  { label: "Role Management", path: "/role-management", icon: Shield, roles: ["ADMIN"] },
  { label: "Audit Logs",     path: "/audit-logs",     icon: ScrollText, roles: ["ADMIN"] },

  // ----- Parent -----
  { label: "My Child",  path: "/my-child",        icon: GraduationCap, roles: ["PARENT"] },
  { label: "Children",  path: "/parent/children", icon: Users,         roles: ["PARENT"] },
];

export function getNavForRole(role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
