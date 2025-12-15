// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Dacă nu există token, redirecționează către login
    return <Navigate to="/login" replace />;
  }

  // Dacă există token, permite accesul la copii
  return children;
}
