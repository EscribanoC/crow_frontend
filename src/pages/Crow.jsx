import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Crow.css";

const Crow = () => {
  const { crowId } = useParams();
  const [crow, setCrow] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadCrow = async () => {
      try {
        const response = await fetch(`${API_URL}crows/${crowId}`);
        if (!response.ok) throw new Error("Error fetching crow");
        const data = await response.json();
        setCrow(data);
      } catch (error) {
        console.error("Error fetching crow:", error);
      }
    };

    loadCrow();
  }, [crowId]);

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          <div className="crow-view-container-background crow-page">
            {crow ? (
              <>
                <section className="crow-header-section">
                  <h1 className="crow-title">{crow.titulo}</h1>
                  <div className="crow-main-info">
                    <div className="crow-image-container">
                      {/*
                        <img
                        src={crow.imagen}
                        alt={crow.titulo}
                        className="crow-main-image"
                      />
                      
                      */}
                      <video width="100%" controls>
                        <source
                          src={
                            crow
                              ? `${API_URL + crow.videoPromocional}`
                              : "example"
                          }
                          type="video/mp4"
                        ></source>
                      </video>
                    </div>
                    <div className="crow-stats">
                      <p>
                        <strong>Meta:</strong> {crow.metaDonacion} €
                      </p>
                      <p>
                        <strong>Recaudado:</strong> {crow.recaudado} €
                      </p>
                      <p>
                        <strong>Fecha límite:</strong> {crow.fechaLimite}
                      </p>
                      <button className="crow-donate-button">
                        Aporta al Crow
                      </button>
                    </div>
                  </div>
                </section>

                <section className="crow-details-section">
                  <div className="crow-extra-info">
                    <div className="crow-description">
                      <h2>Descripción</h2>
                      <p>{crow.descripcion}</p>
                      <div className="crow-category">
                        <p>{crow.categoria} </p>
                      </div>
                    </div>
                    <div className="crow-rewards">
                      <h3>Recompensas</h3>
                      {crow.recompensas && crow.recompensas.length > 0 ? (
                        <>
                          {crow.recompensas.map((recompensa, index) => (
                            <div key={index} className="reward">
                              <div className="reward-image-container">
                                <img src={`${API_URL + recompensa.imagen}`} />
                              </div>
                              <div className="reward-info">
                                <h3>{recompensa.titulo}</h3>
                                <p>{recompensa.descripcion}</p>
                                <p> Meta: {recompensa.metaDonacion}</p>
                              </div>
                              <div className="donate-reward-button">
                                <button className="crow-donate-button">
                                  Donar
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>Sin recompensas</p>
                      )}
                    </div>
                  </div>
                  <div className="line-separator"></div>
                  <div className="crow-user-container">
                    <div
                      className="crow-user-card"
                      onClick={() => {
                        navigate(`/profile/${crow.usuario.usuario}`);
                      }}
                    >
                      <div className="crow-user-card-image">
                        <img
                          src={
                            crow
                              ? `${API_URL + crow.usuario.avatar}`
                              : "example"
                          }
                          alt={crow.usuario.usuario}
                          className="crow-user-avatar"
                        />
                      </div>

                      <p className="crow-user-name">
                        {" "}
                        Creador: {crow.usuario.usuario}
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <p className="crow-loading">Cargando detalles del crow...</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Crow;
