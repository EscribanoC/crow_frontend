import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../js/utils/auth";
import ProfileDropdown from "./ProfileDropdown";

import "../styles/components/Header.css";

const Header = ({ navOption }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li
            className={`nav-item ${
              navOption === "Descubre" ? "nav-item-active" : ""
            }`}
            onClick={() => navigate("/discover")}
          >
            Descubre
          </li>
          <li
            className={`nav-item ${
              navOption === "Principiantes" ? "nav-item-active" : ""
            }`}
          >
            Para principiantes
          </li>
        </ul>
      </nav>
      <div className="logoHeader">
        <div className="logoIcon" onClick={() => navigate("/home")}>
          <img src="/images/Logo2.png"></img>
          <p className="logo">Crow</p>
        </div>
      </div>
      {isAuthenticated() ? (
        <div className="actions">
          <button
            className="start-button"
            onClick={() => navigate("/create-crow")}
          >
            Empieza tu Crow
          </button>
          <ProfileDropdown />
        </div>
      ) : (
        <div className="actions">
          <button
            className="login-button"
            onClick={() => navigate("/", { state: { openLoginModal: true } })}
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
