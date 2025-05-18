import React from "react";
import "../styles/components/Crow.css";

const Crow = ({ crow }) => {
  return (
    <div className="crow">
      <div className="crow-image-container">
        <img src={crow.imagen} className="crow-image" />
      </div>
      <div className="crow-info">
        <div className="crow-title">
          <div className="crow-user-icon">
            <img src={crow.usuario.avatar} className="crow-user-icon" />
          </div>
          <div className="crow-user-name">
            <h3>{crow.titulo}</h3>
            <p>{crow.usuario.usuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crow;
