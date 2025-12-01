import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { BASE_URL } from "../constants/config.jsx";

export default function RegisterPage() {
  const { hasUsers, setHasUsers } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true); // disable button
      await axios.post(`${BASE_URL}/api/auth/register`, form);
      // If we reach here, registration was successful:
      setHasUsers(true);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      // Optionally show an error message to user
    } finally {
      setLoading(false); // re-enable button
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFF] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-slate-600 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleInput}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 text-slate-800"
              disabled={loading}
            />
          </div>

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
              placeholder="Enter your email"
              onChange={handleInput}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 text-slate-800"
              disabled={loading}
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
              onChange={handleInput}
              className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 text-slate-800"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white
                       font-medium py-2 rounded-lg transition 
                       ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
