import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";
const RegisterUsersPage = () => {
    const [formData, setFormData] = useState({ fullName: "", userId: "", password: "", role: "" });
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("User registered successfully", { description: `${formData.fullName} registered as ${formData.role}` });
        setFormData({ fullName: "", userId: "", password: "", role: "" });
    };
    return (<div className="animate-fade-in" style={{ maxWidth: "32rem" }}>
      <div className="page-header">
        <h1>Register New User</h1>
        <p className="subtitle">Only IT Support can register new school personnel and parents</p>
      </div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="field">
              <label className="label">Full Name</label>
              <input className="input" required placeholder="e.g. Jane Wanjiku" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
            </div>
            <div className="field">
              <label className="label">Staff / Parent ID</label>
              <input className="input" required placeholder="e.g. TCH002" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })}/>
            </div>
            <div className="field">
              <label className="label">Temporary Password</label>
              <input className="input" required type="password" placeholder="Set initial password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            </div>
            <div className="field">
              <label className="label">Role</label>
              <select className="select" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="">Assign role</option>
                <option value="TEACHER">Teacher</option>
                <option value="SENIOR_TEACHER">Senior Teacher</option>
                <option value="DEPUTY_PRINCIPAL">Deputy Principal</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="PARENT">Parent</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-2"><UserPlus /> Register User</button>
          </form>
        </div>
      </div>
    </div>);
};
export default RegisterUsersPage;
