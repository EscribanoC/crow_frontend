import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PaginatedCrows from "../components/PaginatedCrows";
import { useLocation } from "react-router-dom";

import "../styles/pages/DiscoverPage.css";
import { useState, useEffect } from "react";

const DiscoverPage = () => {
  const location = useLocation();
  const firstCategory = location.state?.firstCategory || "Todos";
  const [crows, setCrows] = useState([]);
  const [crowsFiltered, setCrowsFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    firstCategory ? firstCategory : "Todos"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const categoryMap = {
    Todos: null,
    Libros: "LIBRO",
    "Juegos de mesa": "JUEGODEMESA",
    Audiovisual: "AUDIOVISUAL",
    Videojuegos: "VIDEOJUEGO",
    Diseño: "DISENO",
    Ropa: "ROPA",
    Otros: "OTRO",
  };

  useEffect(() => {
    const loadCrows = async () => {
      try {
        const response = await fetch(`${API_URL}crows`);
        if (!response.ok) {
          throw new Error("Error fetching crows");
        }
        const data = await response.json();
        setCrows(data);
        setCrowsFiltered(data);
      } catch (error) {
        console.error("Error fetching crows:", error);
      }
    };

    loadCrows();
  }, []);

  useEffect(() => {
    let filtered = [...crows];

    const categoryEnum = categoryMap[selectedCategory];
    if (categoryEnum) {
      filtered = filtered.filter((crow) => crow.categoria === categoryEnum);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (crow) =>
          crow.titulo.toLowerCase().includes(term) ||
          crow.usuario.usuario.toLowerCase().includes(term)
      );
    }

    setCrowsFiltered(filtered);
  }, [searchTerm, selectedCategory, crows]);

  const filterByCategory = (categoryLabel) => {
    setSelectedCategory(categoryLabel);
    const categoryEnum = categoryMap[categoryLabel];

    if (!categoryEnum) {
      setCrowsFiltered(crows);
    } else {
      const filtered = crows.filter((crow) => crow.categoria === categoryEnum);
      setCrowsFiltered(filtered);
    }
  };

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header navOption={"Descubre"} />
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
                {Object.keys(categoryMap).map((label) => (
                  <li key={label}>
                    <button
                      className={`discover-crows-navbar-button ${
                        selectedCategory === label ? "categoryActive" : ""
                      }`}
                      onClick={() => {
                        filterByCategory(label);
                        setSearchTerm("");
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="filter">
                <label
                  className="discover-search-label"
                  htmlFor="discover-search"
                >
                  Busca:{" "}
                </label>
                <div className="discover-search-wrapper">
                  <input
                    id="discover-search"
                    type="text"
                    placeholder="Crows, usuario..."
                    className="discover-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="discover-clear-button"
                      onClick={() => setSearchTerm("")}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              {crowsFiltered.length > 0 ? (
                <PaginatedCrows crows={crowsFiltered} itemsPerPage={8} />
              ) : (
                <div className="noResultsCrows">
                  <p>Sin resultados</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DiscoverPage;
