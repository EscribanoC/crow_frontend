import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CrowComponent from "../components/CrowComponent";
import { useParams } from "react-router-dom";

import "../styles/pages/Profile.css";

import HeartEmpty from "../assets/svg/heart-empty.svg?react";
import HeartFull from "../assets/svg/heart-full.svg?react";
import HeartOff from "../assets/svg/heart-off.svg?react";

const Profile = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [crowsByUser, setCrowsByUser] = useState(null);
  const loggedUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}usuarios/usuario/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(localStorage.getItem("token") && {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
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

  useEffect(() => {
    if (!userData) return;

    const fetchRewardsByUser = async () => {
      try {
        const response = await fetch(
          `${API_URL}crows/crowsByUser/${userData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setCrowsByUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRewardsByUser();
  }, [userData]);

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
                  {loggedUsername && loggedUsername !== userData.usuario && (
                    <button
                      className={
                        userData.following
                          ? "button-is-following"
                          : "button-is-not-following"
                      }
                      onClick={async () => {
                        const endpoint = userData.following
                          ? `${API_URL}usuarios/unfollow/${userData.id}`
                          : `${API_URL}usuarios/follow/${userData.id}`;
                        try {
                          const response = await fetch(endpoint, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          });

                          if (!response.ok) {
                            throw new Error("Failed to update follow status");
                          }

                          const updated = {
                            ...userData,
                            following: !userData.following,
                          };
                          setUserData(updated);
                        } catch (error) {
                          console.error("Error updating follow status:", error);
                        }
                      }}
                    >
                      {userData.following ? <HeartFull /> : <HeartEmpty />}
                    </button>
                  )}
                </div>
              </div>
              <div className="profile-description">
                <h2>Crows</h2>
                {crowsByUser ? (
                  <div className="profile-crows">
                    {crowsByUser.map((crow, index) => (
                      <CrowComponent key={index} crow={crow} />
                    ))}
                  </div>
                ) : (
                  <p>Sin crows</p>
                )}
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
