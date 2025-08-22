import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useAuth } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import TaskCreationPage from "./pages/TaskCreationPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";

// Route wrappers
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <TaskCreationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
