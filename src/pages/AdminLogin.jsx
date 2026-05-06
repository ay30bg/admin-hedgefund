import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import "../styles/auth.css";
import logo from "../assets/logo.png";

function AdminLoginPage() {
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminLogin = async () => {
    if (!form.email.trim()) {
      return alert("Please enter admin email.");
    }

    if (!form.password.trim()) {
      return alert("Please enter password.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/admin/login`,
        form
      );

      const { token, user } = res.data;

      // Store auth
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      alert("Admin login successful!");
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("Admin login error:", err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not responding");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-overlay">
        <div className="admin-login-box">

          {/* LOGO */}
          <div className="admin-logo-container">
            <img src={logo} alt="Admin Logo" className="admin-login-logo" />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="admin-input-field"
            value={form.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="admin-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="admin-input-field"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="admin-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="admin-login-btn"
            onClick={handleAdminLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>

          <p className="login-footer">
            Authorized access only, Admin panel is restricted.
          </p>

        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
