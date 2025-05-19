import React from "react";
import "../styles/components/Header.css";
import { useState, useEffect } from "react";
import { fetchCurrentUser } from "../js/userService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  /*
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchCurrentUser();
      console.log(userData);
      if (userData) setUser(userData);
    };

    loadUser();
  }, []);
*/
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => navigate("/discover")}>
            Descubre
          </li>
          <li className="nav-item">Para principiantes</li>
        </ul>
      </nav>
      <div className="logoHeader">
        <div className="logoIcon" onClick={() => navigate("/home")}>
          <img src="./images/Logo2.png"></img>
          <p className="logo">Crow</p>
        </div>
      </div>
      <div className="actions">
        <button
          className="start-button"
          onClick={() => navigate("/create-crow")}
        >
          Empieza tu Crow
        </button>
        <button className="image-button">
          <img
            src="./images/Logo2.png"
            alt="Avatar"
            className="image-icon"
            width={"35px"}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
