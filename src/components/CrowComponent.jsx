import { useNavigate } from "react-router-dom";

import "../styles/components/CrowComponent.css";

const CrowComponent = ({ crow }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="crow-item" onClick={() => navigate(`/crow/${crow.id}`)}>
      <div className="crow-item-image-container">
        <img
          src={crow ? `${API_URL + crow.imagenes[0]}` : "prueba"}
          className="crow-image"
        />
      </div>
      <div className="crow-item-info">
        <div className="crow-item-title">
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${crow.usuario.usuario}`);
            }}
            className="crow-item-user-icon"
          >
            <img
              src={
                crow.usuario ? `${API_URL + crow.usuario.avatar}` : "example"
              }
            />
          </div>
          <div className="crow-item-user-name">
            <h3>{crow.titulo}</h3>
            <p
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${crow.usuario.usuario}`);
              }}
            >
              {crow.usuario.usuario}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowComponent;
