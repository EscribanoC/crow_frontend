import React from 'react';
import '../styles/components/Header.css';

const Header = () => {
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
                <button className="image-button">🖼️</button>
            </div>
        </header>
    );
};

export default Header;