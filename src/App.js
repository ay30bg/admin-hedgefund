import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/AdminUsers";
import Transactions from "./pages/AdminTransactions";
import Plans from "./pages/AdminPlans";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root → admin */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* Sub routes */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="plans" element={<Plans />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <h2 style={{ padding: "40px" }}>
              404 - Page Not Found
            </h2>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;

