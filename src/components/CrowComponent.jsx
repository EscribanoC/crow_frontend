import { useNavigate } from "react-router-dom";

import "../styles/components/CrowComponent.css";

const CrowComponent = ({ crow }) => {
  const navigate = useNavigate();

  return (
    <div className="crow-item" onClick={() => navigate(`/crow/${crow.id}`)}>
      <div className="crow-item-image-container">
        <img src={crow.imagen} className="crow-image" />
      </div>
      <div className="crow-item-info">
        <div className="crow-item-title">
          <div className="crow-item-user-icon">
            <img src={crow.usuario.avatar} className="crow-item-user-icon" />
          </div>
          <div className="crow-item-user-name">
            <h3>{crow.titulo}</h3>
            <p>{crow.usuario.usuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowComponent;
