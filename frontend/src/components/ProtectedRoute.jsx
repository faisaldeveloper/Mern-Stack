import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user";

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const roleGetter = useUserStore((state) => state.getRole);
  const role = typeof roleGetter === 'function' ? roleGetter() : undefined;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />; // Or an "access denied" page
  }
  return children;
};

export default ProtectedRoute;
