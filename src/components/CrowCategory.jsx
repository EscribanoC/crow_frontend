import React from "react";
import { useNavigate } from "react-router-dom";

const categoryMap = {
  LIBRO: "Libros",
  JUEGODEMESA: "Juegos de mesa",
  AUDIOVISUAL: "Audiovisual",
  VIDEOJUEGO: "Videojuegos",
  DISENO: "Diseño",
  ROPA: "Ropa",
  OTRO: "Otros",
};

const CrowCategory = ({ category }) => {
  const formattedCategory = categoryMap[category] || category;
  const navigate = useNavigate();

  return (
    <div
      className="crow-category"
      onClick={(e) => {
        e.stopPropagation();
        navigate("/discover", { state: { firstCategory: formattedCategory } });
      }}
    >
      <p>{formattedCategory} </p>
    </div>
  );
};

export default CrowCategory;
