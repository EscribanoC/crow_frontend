import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaginatedCrows from "../components/PaginatedCrows";

import "../styles/pages/DiscoverPage.css";
import { useState, useEffect } from "react";

const DiscoverPage = () => {
  const [crows, setCrows] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadCrows = async () => {
      try {
        const response = await fetch(`${API_URL}crows`);
        if (!response.ok) {
          throw new Error("Error fetching crows");
        }
        const data = await response.json();
        setCrows(data);
      } catch (error) {
        console.error("Error fetching crows:", error);
      }
    };

    loadCrows();
  }, []);

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          <div className="discover-crows-container discover-crows-introduction">
            <div className="discover-crows-advertisement">
              <div className="discover-crows-advertisement-content">
                <p>
                  A día de hoy tenemos más de... <b>¡300 crows en vuelo! </b>
                  Descubre según tus hobbies y gustos y si quieres apoya a un
                  creador.
                </p>
              </div>

              <h1 className="section-title">Descubre</h1>
            </div>
            <div className="discover-crows-content">
              <ul className="discover-crows-navbar">
                <li>
                  <button className="discover-crows-navbar-button">
                    Todos
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Libros
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Juegos de mesa
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Audiovisual
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Videojuegos
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Diseño
                  </button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">Ropa</button>
                </li>
                <li>
                  <button className="discover-crows-navbar-button">
                    Otros
                  </button>
                </li>
              </ul>

              <PaginatedCrows crows={crows} itemsPerPage={8} />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DiscoverPage;
