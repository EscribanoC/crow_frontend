import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/components/NotificationItem.css";

const NotificationItem = ({ notificacion, onRead }) => {
  const { id, tipo, emisor, crow, leida } = notificacion;
  const [read, setRead] = useState(leida);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const readNotification = () => {
    const token = localStorage.getItem("token");
    if (!read) {
      axios
        .patch(`${API_URL}notificaciones/${id}/leer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setRead(true);
          onRead?.(id);
        })
        .catch((err) =>
          console.error("No se ha podido leer la notificación: ", err)
        );
    }
  };

  const renderMensaje = () => {
    switch (tipo) {
      case "NUEVO_CROW":
        return (
          <li className="notification-item" onMouseOver={readNotification}>
            <div>
              <a onClick={() => navigate(`/profile/${emisor.usuario}`)}>
                {emisor.usuario}
              </a>{" "}
              ha creado un nuevo proyecto:&nbsp;
              {crow ? (
                <a onClick={() => navigate(`/crow/${crow.id}`)}>
                  {crow.titulo}
                </a>
              ) : (
                "un proyecto"
              )}
            </div>
            {!read && <span className="point-not-read"></span>}
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
