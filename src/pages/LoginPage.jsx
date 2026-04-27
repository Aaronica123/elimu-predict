import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, GraduationCap, Loader2, ShieldCheck } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";
const DEMO_ACCOUNTS = {
    TCH001: { password: "teacher123", role: "TEACHER", fullName: "Jane Wanjiku" },
    SNR001: { password: "senior123", role: "SENIOR_TEACHER", fullName: "Peter Ochieng" },
    PRC001: { password: "principal123", role: "PRINCIPAL", fullName: "Dr. Mary Akinyi" },
    DPC001: { password: "deputy123", role: "DEPUTY_PRINCIPAL", fullName: "John Kamau" },
    ITH001: { password: "ithandler123", role: "IT_HANDLER", fullName: "Kevin Mwangi" },
    ADM001: { password: "admin123", role: "ADMIN", fullName: "Susan Njeri" },
    PAR001: { password: "parent123", role: "PARENT", fullName: "Grace Atieno" },
};
const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!userId.trim() || !password.trim()) {
            setError("Please enter your Staff/Parent ID and password.");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        const demo = DEMO_ACCOUNTS[userId.toUpperCase()];
        if (demo && demo.password === password) {
            login("demo-jwt-token", { id: 1, fullName: demo.fullName, userId: userId.toUpperCase(), role: demo.role, isActive: true });
            setLoading(false);
            navigate("/dashboard");
        }
        else {
            setLoading(false);
            setError("Invalid credentials. Only registered school staff and parents can access this system.");
        }
    };
    return (<div className="login-shell">
      <div className="login-hero">
        <img src={loginBg} alt=""/>
        <div className="overlay"/>
        <div className="content">
          <div className="brand">
            <GraduationCap />
            <span>Elimu-Predict</span>
          </div>
          <div className="pitch">
            <h1>AI-Powered Student Performance Monitoring</h1>
            <p>Early risk detection, personalized recommendations, and data-driven insights for every student.</p>
          </div>
          <div className="footer-note">
            <ShieldCheck />
            <span>Access restricted to authorized school personnel only</span>
          </div>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-form-wrap animate-fade-in">
          <div className="login-mobile-brand">
            <GraduationCap />
            <span>Elimu-Predict</span>
          </div>

          <div className="login-card">
            <h2>Sign In</h2>
            <p className="subtitle">Enter your school-issued credentials to continue</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="field">
                <label className="label" htmlFor="userId">Staff / Parent ID</label>
                <input id="userId" className="input lg" placeholder="e.g. TCH001, PAR001" value={userId} onChange={(e) => setUserId(e.target.value)} autoComplete="username"/>
                <p className="help">Your unique ID provided by the IT department</p>
              </div>

              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <div className="input-group">
                  <input id="password" type={showPassword ? "text" : "password"} className="input lg with-icon-right" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                  <button type="button" className="icon-right-btn" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {error && <div className="alert" role="alert">{error}</div>}

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                {loading ? (<><Loader2 className="animate-spin"/> Authenticating...</>) : "Sign In"}
              </button>

              <div className="flex justify-end">
                <button type="button" className="btn btn-link" onClick={() => setShowForgot(true)}>
                  Forgot password?
                </button>
              </div>
            </form>

            {showForgot && (<div className="alert muted mt-4">
                <p className="font-bold mb-2 foreground-text">Reset Your Password</p>
                <p className="text-xs mb-3">
                  Contact your school's IT department with your Staff/Parent ID to reset your password.
                </p>
                <button className="btn btn-outline btn-sm" onClick={() => setShowForgot(false)}>Close</button>
              </div>)}

            <div className="mt-6" style={{ paddingTop: "1rem", borderTop: "1px solid hsl(var(--border))" }}>
              <p className="text-xs muted-text text-center">
                Can't access your account? Contact your school's IT department for assistance.
              </p>
            </div>
          </div>

          <div className="demo-box">
            <p className="title">Demo Accounts (dev only):</p>
            <div className="accounts">
              <span>TCH001 / teacher123</span>
              <span>SNR001 / senior123</span>
              <span>PRC001 / principal123</span>
              <span>DPC001 / deputy123</span>
              <span>ITH001 / ithandler123</span>
              <span>ADM001 / admin123</span>
              <span>PAR001 / parent123</span>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default LoginPage;
