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

  const handleClick = () => {
    navigate("/discover", { state: { firstCategory: formattedCategory } });
  };

  return (
    <div className="crow-category" onClick={handleClick}>
      <p>{formattedCategory} </p>
    </div>
  );
};

export default CrowCategory;
