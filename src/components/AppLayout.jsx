import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getNavForRole } from "@/lib/navigation";

import { GraduationCap, LogOut, Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ROLE_LABELS = {
  TEACHER: "Teacher",
  SENIOR_TEACHER: "Senior Teacher",
  DEPUTY_PRINCIPAL: "Deputy Principal",
  PRINCIPAL: "Principal",
  IT_HANDLER: "IT Support",
  ADMIN: "Administrator",
  PARENT: "Parent",
};
const AppLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    if (!user){
      alert("not found")
        return null;
    }
        
    const navItems = getNavForRole(user[2]);
    const handleLogout = () => { logout(); navigate("/login"); };
    const Sidebar = (<aside className={cn("sidebar", open && "open")}>
      <div className="sidebar-logo">
        <GraduationCap className="logo-icon"/>
        <div className="logo-text">
          <span className="title">Elimu-Predict</span>
          <span className="subtitle">{ROLE_LABELS[user[2]]}</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => (<NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
            <item.icon />
            {item.label}
          </NavLink>))}
      </nav>

      <div className="sidebar-user">
        <div className="row">
          <div className="avatar">{user[1]}</div>
          <div className="info">
            <p className="name">{user[1]}</p>
            <p className="id">{user[2]}</p>
          </div>
        </div>
        <button type="button" className="btn btn-ghost danger btn-block" onClick={handleLogout}>
          <LogOut /> Sign Out
        </button>
      </div>
    </aside>);
    return (<div className="app-shell">
      {Sidebar}
      <div className={cn("sidebar-overlay", open && "open")} onClick={() => setOpen(false)}/>

      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
          <div className="flex-1"/>
          <div className="flex items-center gap-3">
            <button className="notif-btn" aria-label="Notifications">
              <Bell />
              <span className="dot"/>
            </button>
          </div>
        </header>

        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>);
};
export default AppLayout;
