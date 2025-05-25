import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

import "../styles/pages/Profile.css";

const Profile = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}usuarios/usuario/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username, API_URL]);

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          {userData && (
            <div className="profile-information">
              <div className="profile-header">
                <div className="profile-picture">
                  <img
                    src={userData ? `${API_URL + userData.avatar}` : "example"}
                    alt="Foto de perfil"
                    className="profile-picture-image"
                  />
                </div>
                <div className="profile-information">
                  <h1>{userData.usuario}</h1>
                  <div className="profile-data"></div>
                </div>
              </div>
              <div className="profile-description">
                <h2>Mis Crows</h2>
                <p>{userData.descripcion}</p>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
