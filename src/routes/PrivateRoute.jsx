import React from "react";
import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const decoded = parseJwt(token);

  if (!token) return <Navigate to="/" replace />;

  try {
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch {
    return <Navigate to="/" replace />;
  }
}

export default PrivateRoute;
