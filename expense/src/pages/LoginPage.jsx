import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", form);
      const { token } = res.data;
      login(token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFF] flex items-center justify-center px-4">
      {/* Centered card container */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Login</h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInput}
              disabled={loading}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-slate-800"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleInput}
              disabled={loading}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         text-slate-800"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white
                        font-medium py-2 rounded-lg transition-colors 
                        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
