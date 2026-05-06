import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
