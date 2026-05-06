import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;
