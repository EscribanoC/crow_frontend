import React from 'react';
import '../styles/components/Header.css';
import { useState, useEffect } from 'react';
import { fetchCurrentUser } from "../js/userService";

const Header = () => {
    const [user, setUser] = useState(null);
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const loadUser = async () => {
          const userData = await fetchCurrentUser()
          console.log(userData);
          if (userData) setUser(userData);
        };
    
        loadUser();
      }, []);

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">Descubre</li>
                    <li className="nav-item">Para principiantes</li>
                </ul>
            </nav>
            <div>
                <p className="logo">Crow</p>
            </div>
            <div className="actions">
                <button className="start-button">Empieza tu Crow</button>
                <button className="image-button">
                    <img src={`${API_URL}avatars/a32d7286-e3ec-47f2-985b-81be5fb1c6c9_ASTARION.jpg`} alt="Avatar" className="image-icon" />
                </button>
            </div>
        </header>
    );
};

export default Header;