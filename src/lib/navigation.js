import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, Brain,
  BarChart3, Shield, ScrollText, UserPlus, FileText, Lightbulb,
  PieChart, TrendingUp, Layers, UploadCloud,
} from "lucide-react";

export const NAV_ITEMS = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "IT_HANDLER", "ADMIN", "PARENT"],
    },
    {
        label: "Dashboard_1",
        path: "/dash",
        icon: LayoutDashboard,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "IT_HANDLER", "ADMIN", "PARENT"],
    },
    {
        label: "Students",
        path: "/students",
        icon: GraduationCap,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "IT_HANDLER", "ADMIN"],
    },
    {
        label: "Subjects",
        path: "/subjects",
        icon: BookOpen,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL", "ADMIN", "IT_HANDLER"],
    },
    {
        label: "Marks Entry",
        path: "/marks",
        icon: ClipboardList,
        roles: ["TEACHER"],
    },
    {
        label: "View Marks",
        path: "/view-marks",
        icon: ClipboardList,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL"],
    },
    
    // {
    //     label: "AI Analysis",
    //     path: "/ai-analysis",
    //     icon: Brain,
    //     roles: ["TEACHER", "SENIOR_TEACHER", "PRINCIPAL", "PARENT"],
    // },
    {
        label: "AI Class Analysis",
        path: "/school-analysis",
        icon: Brain,
        roles: ["TEACHER", "SENIOR_TEACHER", "PRINCIPAL"],
    },
    {
        label: "AI Student Analysis",
        path: "/student-analysis",
        icon: Brain,
        roles: ["TEACHER", "SENIOR_TEACHER", "PRINCIPAL"],
    },
    {
        label: "Reports",
        path: "/reports",
        icon: BarChart3,
        roles: ["TEACHER", "SENIOR_TEACHER", "DEPUTY_PRINCIPAL", "PRINCIPAL"],
    },
    {
        label: "Register Users",
        path: "/register-users",
        icon: UserPlus,
        roles: ["IT_HANDLER","ADMIN"],
    },
    {
        label: "Assign Teacher",
        path: "/assign-teacher",
        icon: UserPlus,
        roles: ["IT_HANDLER"],
    },
    {
        label: "Register Subject",
        path: "/register-subject",
        icon: UserPlus,
        roles: ["IT_HANDLER"],
    },

    {
        label: "User Management",
        path: "/user-management",
        icon: Users,
        roles: ["ADMIN"],
    },
    {
        label: "Role Management",
        path: "/role-management",
        icon: Shield,
        roles: ["ADMIN"],
    },
    {
        label: "Audit Logs",
        path: "/audit-logs",
        icon: ScrollText,
        roles: ["ADMIN"],
    },
    {
        label: "My Child",
        path: "/my-child",
        icon: GraduationCap,
        roles: ["PARENT"],
    },
    {
        label: "Parent Dashboard",
        path: "/parent/dashboard",
        icon: GraduationCap,
        roles: ["PARENT"],
    },
    {
        label: "View Children",
        path: "/parent-children",
        icon: GraduationCap,
        roles: ["PARENT"],
    },
    {
        label: "Child Profile",
        path: "/parent/child/:adm",
        icon: GraduationCap,
        roles: ["PARENT"],
        hidden: true,
    },
    {
        label: "AI Suggestions",
        path: "/parent/child/:adm/suggestions",
        icon: Lightbulb,
        roles: ["PARENT"],
        hidden: true,
    },
];

export function getNavForRole(role) {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
