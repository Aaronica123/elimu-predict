import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getNavForRole } from "@/lib/navigation";

import { GraduationCap, LogOut, Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
const AppLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    if (!user)
        return null;
    const navItems = getNavForRole(user.role);
    const handleLogout = () => { logout(); navigate("/login"); };
    const Sidebar = (<aside className={cn("sidebar", open && "open")}>
      <div className="sidebar-logo">
        <GraduationCap className="logo-icon"/>
        <div className="logo-text">
          <span className="title">Elimu-Predict</span>
          <span className="subtitle">{ROLE_LABELS[user.role]}</span>
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
          <div className="avatar">{user.fullName.charAt(0)}</div>
          <div className="info">
            <p className="name">{user.fullName}</p>
            <p className="id">{user.userId}</p>
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
