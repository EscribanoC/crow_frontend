import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../js/userService";

import "../styles/components/ProfileDropdown.css";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUser(user);
      } else {
        console.error("Error fetching user data");
      }
    };
    fetchUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="image-profile-button" onClick={toggleDropdown}>
        <img
          src={user ? user.avatar : "/images/Logo2.png"}
          alt="Avatar"
          className="image-icon"
          width={"35px"}
        />
      </button>

      {open && (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              toggleDropdown();
              navigate(user ? `/profile/${user.usuario}` : "/home");
            }}
          >
            Mi perfil
          </button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
