import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/components/NotificationItem.css";

const NotificationItem = ({ notificacion }) => {
  const { tipo, emisor, crow } = notificacion;
  const navigate = useNavigate();

  const renderMensaje = () => {
    switch (tipo) {
      case "NUEVO_CROW":
        return (
          <li className="notification-item">
            <a onClick={() => navigate(`/profile/${emisor.usuario}`)}>
              {emisor.usuario}
            </a>{" "}
            ha creado un nuevo proyecto:&nbsp;
            {crow ? (
              <a onClick={() => navigate(`/crow/${crow.id}`)}>{crow.titulo}</a>
            ) : (
              "un proyecto"
            )}
          </li>
        );
      case "DONACION":
        return <></>;
      default:
        return <>Tienes una nueva notificación.</>;
    }
  };

  return <div className="notificacion-item">{renderMensaje()}</div>;
};

export default NotificationItem;
