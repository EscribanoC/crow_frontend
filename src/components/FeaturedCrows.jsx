import React, { useState, useEffect } from "react";
import "../styles/components/FeaturedCrows.css";
import CrowComponent from "./CrowComponent";

const FeaturedCrows = () => {
  const [crows, setCrows] = useState([]);
  const [crowOfTheWeek, setCrowOfTheWeek] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener todos los crows
        const crowsResponse = await fetch(`${API_URL}crows`);
        const crowsData = await crowsResponse.json();
        setCrows(crowsData.slice(0, 6));

        // 2. Obtener el crow de la semana
        const crowOfTheWeekResponse = await fetch(
          `${API_URL}crows/crowOfTheWeek`
        );
        const crowOfTheWeekData = await crowOfTheWeekResponse.json();
        setCrowOfTheWeek(crowOfTheWeekData);
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="featured-crows-container">
      <div className="crow-of-the-week-container">
        <h2>Proyecto de la semana</h2>
        {crowOfTheWeek ? (
          <div className="crow-of-the-week-content">
            <div className="crow-of-the-week-image-container">
              <img src={crowOfTheWeek.imagen} className="crow-image" />
            </div>
            <div className="crow-of-the-week-info">
              <div className="crow-of-the-week-title">
                <div className="crow-of-the-week-user-icon">
                  <img
                    src={crowOfTheWeek.usuario.avatar}
                    className="crow-user-icon"
                    alt="User Avatar"
                  />
                </div>
                <div className="crow-of-the-week-user-name">
                  <h3>{crowOfTheWeek.titulo}</h3>
                  <p>{crowOfTheWeek.usuario.usuario}</p>
                </div>
              </div>

              <div>
                <p>{crowOfTheWeek.descripcion}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="other-crows-container">
        <h2>Otros Proyectos</h2>
        <div className="other-crows-list">
          {crows.map((crow, index) => (
            <CrowComponent key={index} crow={crow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCrows;
