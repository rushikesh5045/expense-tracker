import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, hasUsers } = useContext(AuthContext);

  // If hasUsers is null, we don't know yet; let's return nothing or a loader:
  if (hasUsers === null) return <div>Loading...</div>;

  // If there are NO users yet, forcibly show Register page
  if (!hasUsers) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/*
          In case they navigate anywhere else, always push them back to /register.
        */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    );
  }

  // If users exist, we can show Login or Dashboard, etc.
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      {/* If user hits root ("/"), decide based on isAuthenticated */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* If user hits something else, fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
