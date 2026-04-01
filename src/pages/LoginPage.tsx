import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, GraduationCap, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import loginBg from "@/assets/login-bg.jpg";

// Demo accounts for frontend development — remove when connecting to real backend
const DEMO_ACCOUNTS: Record<string, { password: string; role: UserRole; fullName: string }> = {
  "TCH001": { password: "teacher123", role: "TEACHER", fullName: "Jane Wanjiku" },
  "SNR001": { password: "senior123", role: "SENIOR_TEACHER", fullName: "Peter Ochieng" },
  "PRC001": { password: "principal123", role: "PRINCIPAL", fullName: "Dr. Mary Akinyi" },
  "DPC001": { password: "deputy123", role: "DEPUTY_PRINCIPAL", fullName: "John Kamau" },
  "ITH001": { password: "ithandler123", role: "IT_HANDLER", fullName: "Kevin Mwangi" },
  "ADM001": { password: "admin123", role: "ADMIN", fullName: "Susan Njeri" },
  "PAR001": { password: "parent123", role: "PARENT", fullName: "Grace Atieno" },
};

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      setError("Please enter your Staff/Parent ID and password.");
      return;
    }

    setIsLoading(true);

    // TODO: Replace with real API call: api.post<AuthResponse>("/auth/login", { userId, password })
    await new Promise((r) => setTimeout(r, 800));

    const demo = DEMO_ACCOUNTS[userId.toUpperCase()];
    if (demo && demo.password === password) {
      login("demo-jwt-token", {
        id: 1,
        fullName: demo.fullName,
        userId: userId.toUpperCase(),
        role: demo.role,
        isActive: true,
      });
      setIsLoading(false);
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setError("Invalid credentials. Only registered school staff and parents can access this system.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={loginBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-primary opacity-80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-10 w-10" />
            <span className="text-2xl font-heading font-bold tracking-tight">Elimu-Predict</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-4xl font-heading font-extrabold leading-tight mb-4">
              AI-Powered Student Performance Monitoring
            </h1>
            <p className="text-lg opacity-90">
              Early risk detection, personalized recommendations, and data-driven insights for every student.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-75">
            <ShieldCheck className="h-4 w-4" />
            <span>Access restricted to authorized school personnel only</span>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-heading font-bold text-foreground">Elimu-Predict</span>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">Sign In</h2>
              <p className="text-sm text-muted-foreground">
                Enter your school-issued credentials to continue
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-foreground">Staff / Parent ID</Label>
                  <Input
                    id="userId"
                    placeholder="e.g. TCH001, PAR001"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="h-11"
                    autoComplete="username"
                    aria-describedby="userId-help"
                  />
                  <p id="userId-help" className="text-xs text-muted-foreground">
                    Your unique ID provided by the IT department
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </motion.div>
                )}

                <Button type="submit" className="w-full h-11 font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-sm text-primary h-auto py-0"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </Button>
                </div>
              </form>

              {showForgotPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <p className="text-sm font-semibold text-foreground mb-2">Reset Your Password</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Contact your school's IT department with your Staff/Parent ID to reset your password.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Close
                    </Button>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Can't access your account? Contact your school's IT department for assistance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo credentials hint — remove in production */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Demo Accounts (dev only):</p>
            <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
              <span>TCH001 / teacher123</span>
              <span>SNR001 / senior123</span>
              <span>PRC001 / principal123</span>
              <span>DPC001 / deputy123</span>
              <span>ITH001 / ithandler123</span>
              <span>ADM001 / admin123</span>
              <span>PAR001 / parent123</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
