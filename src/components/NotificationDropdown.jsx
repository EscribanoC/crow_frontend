import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import NotificationItem from "./NotificationItem";

import Bell from "../assets/svg/bell.svg?react";
import "../styles/components/NotificationDropdown.css";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const dropdownRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}notificaciones/propias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setNotificaciones(res.data))
      .catch((err) => console.error("Error cargando notificaciones:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  return (
    <div className="notif-container" ref={dropdownRef}>
      <button className="notif-button" onClick={() => setOpen(!open)}>
        <Bell className="notification-icon" />
        {notificaciones.some((n) => !n.leida) && (
          <span className="notif-dot"></span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-header">Notificaciones</div>
          {notificaciones.length === 0 ? (
            <div className="notif-empty">No tienes notificaciones.</div>
          ) : (
            <ul className="notif-list">
              {notificaciones.map((n) => (
                <NotificationItem
                  key={n.id}
                  notificacion={n}
                  onRead={handleMarkAsRead}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
