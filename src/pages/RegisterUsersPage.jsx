import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/lib/toast";
import api from "../lib/api";

const NAME_RE = /^[A-Za-z][A-Za-z'\-\s]{1,49}$/;
const USER_ID_RE = /^[A-Z]{3}\d{3,5}$/; // e.g. TCH002, PAR001
// Strong password: 8+ chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const validate = (data) => {
    const errors = {};
    if (!NAME_RE.test(data.fullName.trim())) {
        errors.fullName = "Enter a valid full name (letters, spaces, ' or -, 2-50 chars).";
    }
    if (!USER_ID_RE.test(data.userId.trim())) {
        errors.userId = "ID must be 3 uppercase letters followed by 3-5 digits (e.g. TCH002).";
    }
    if (!PASSWORD_RE.test(data.password)) {
        errors.password = "Password must be 8+ chars with upper, lower, number, and a special character.";
    }
    if (!data.role) errors.role = "Please assign a role.";
    return errors;
};

const RegisterUsersPage = () => {
    const [formData, setFormData] = useState({ fullName: "", userId: "", password: "", role: "" });
    const [errors, setErrors] = useState({});

    const set = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errs = validate(formData);
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            toast.error("Please fix the highlighted errors");
            return;
        }
        try{
          const resp=await api.post('/users/register',{
          "fullName":formData.fullName,
          "password":formData.password,
          "username":formData.userId,
          "role":formData.role
        })

        toast.success("User registered successfully", { description: `${resp.fullName} registered on ${resp.createdAt}` });
        setFormData({ fullName: "", userId: "", password: "", role: "" });
        setErrors({});
        }
        catch(error){
          alert(error.message)
        }
        
    };

    const errStyle = { color: "hsl(var(--destructive))", fontSize: "0.75rem", marginTop: "0.25rem" };

    return (<div className="animate-fade-in" style={{ maxWidth: "32rem" }}>
      <div className="page-header">
        <h1>Register New User</h1>
        <p className="subtitle">Only IT Support can register new school personnel and parents</p>
      </div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="field">
              <label className="label">Full Name</label>
              <input className="input" required placeholder="e.g. Jane Wanjiku" value={formData.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={50}/>
              {errors.fullName && <p style={errStyle}>{errors.fullName}</p>}
            </div>
            <div className="field">
              <label className="label">Staff / Parent ID</label>
              <input className="input" required placeholder="e.g. TCH002" value={formData.userId} onChange={(e) => set("userId", e.target.value.toUpperCase())} maxLength={8}/>
              {errors.userId && <p style={errStyle}>{errors.userId}</p>}
            </div>
            <div className="field">
              <label className="label">Temporary Password</label>
              <input className="input" required type="password" placeholder="Min 8 chars, upper, lower, number, special" value={formData.password} onChange={(e) => set("password", e.target.value)} minLength={8} maxLength={64}/>
              {errors.password && <p style={errStyle}>{errors.password}</p>}
            </div>
            <div className="field">
              <label className="label">Role</label>
              <select className="select" required value={formData.role} onChange={(e) => set("role", e.target.value)}>
                <option value="">Assign role</option>
                <option value="TEACHER">Teacher</option>
                <option value="SENIOR_TEACHER">Senior Teacher</option>
                <option value="DEPUTY_PRINCIPAL">Deputy Principal</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="PARENT">Parent</option>
              </select>
              {errors.role && <p style={errStyle}>{errors.role}</p>}
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-2"><UserPlus /> Register User</button>
          </form>
        </div>
      </div>
    </div>);
};
export default RegisterUsersPage;
