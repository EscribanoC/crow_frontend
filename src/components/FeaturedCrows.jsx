import React, { useState, useEffect } from "react";
import "../styles/components/FeaturedCrows.css";
import CrowComponent from "./CrowComponent";
import { useNavigate } from "react-router-dom";
import CrowCategory from "../components/CrowCategory";

const FeaturedCrows = () => {
  const [allCrows, setAllCrows] = useState([]);
  const [visibleCrows, setVisibleCrows] = useState([]);
  const [crowOfTheWeek, setCrowOfTheWeek] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const crowsResponse = await fetch(`${API_URL}crows`);
        const crowsData = await crowsResponse.json();
        setAllCrows(crowsData);

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

  useEffect(() => {
    if (allCrows.length > 0) {
      const calculateVisibleCrows = () => {
        const width = window.innerWidth;
        const count = width < 1599 ? (width < 1064 ? 2 : 4) : 6;
        setVisibleCrows(allCrows.slice(0, count));
      };

      calculateVisibleCrows();

      const handleResize = () => calculateVisibleCrows();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [allCrows]);

  return (
    <div className="featured-crows-container">
      <div className="crow-of-the-week-container">
        <h2>Proyecto de la semana</h2>
        {crowOfTheWeek ? (
          <div
            className="crow-of-the-week-content"
            onClick={() => navigate(`/crow/${crowOfTheWeek.id}`)}
          >
            <div className="crow-of-the-week-image-container">
              {crowOfTheWeek.imagenes && crowOfTheWeek.imagenes.length > 0 ? (
                <img
                  src={`${API_URL + crowOfTheWeek.imagenes[0]}`}
                  className="crow-image"
                />
              ) : (
                <p>Sin fotos</p>
              )}
            </div>
            <div className="crow-of-the-week-info">
              <div className="crow-of-the-week-title">
                <div
                  className="crow-of-the-week-user-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${crowOfTheWeek.usuario.usuario}`);
                  }}
                >
                  <img
                    src={
                      crowOfTheWeek.usuario
                        ? `${API_URL + crowOfTheWeek.usuario.avatar}`
                        : "example"
                    }
                    className="crow-user-icon"
                    alt="User Avatar"
                  />
                </div>
                <div className="crow-of-the-week-user-name">
                  <h3>{crowOfTheWeek.titulo}</h3>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${crowOfTheWeek.usuario.usuario}`);
                    }}
                  >
                    {crowOfTheWeek.usuario.usuario}
                  </p>
                </div>
              </div>
              <div className="crow-of-the-week-description">
                <p>{crowOfTheWeek.descripcion}</p>
              </div>

              <CrowCategory category={crowOfTheWeek.categoria} />
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      <div className="other-crows-container">
        <h2>Otros Proyectos</h2>
        <div className="other-crows-list">
          {visibleCrows.map((crow, index) => (
            <CrowComponent key={index} crow={crow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCrows;
