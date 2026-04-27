import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated)
        return <Navigate to="/login" replace/>;
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace/>;
    }
    return <Outlet />;
};
export default ProtectedRoute;
