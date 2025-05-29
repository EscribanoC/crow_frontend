import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="admin-header">
      <img src="/images/Logo2.png" alt="Logo" className="admin-logo" />
      <p className="logo">Crow</p>
      <button className="logout-admin-button" onClick={handleLogout}>
        Salir
      </button>
    </header>
  );
}

export default AdminHeader;
