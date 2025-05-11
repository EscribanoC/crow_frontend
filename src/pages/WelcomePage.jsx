import React, { useState, useEffect } from 'react';
import '../styles/WelcomePage.css';
import LoginModal from '../components/LoginModal';
import {scrollToElement} from '../js/smooth-scroll';

function WelcomePage() {
  const [crows, setCrows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}api/v1/crows`)
      .then((response) => response.json())
      .then((data) => setCrows(data))
      .catch((error) => console.error('Error fetching crows:', error));

    const handleWheel = (event) => {
      const helpSection = document.getElementById('welcome-page-crows');
      const fullscreenContainer = document.querySelector('.welcome-page-content');

      if (event.deltaY > 0) {
        scrollToElement(helpSection, 1500);
      } else {
        scrollToElement(fullscreenContainer, 1500);
      }
    };

    window.addEventListener('wheel', handleWheel);

    window.addEventListener('mousedown', function (e) {
      if (e.button === 1) {
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', function (e) {
        if (e.button === 1) {
          e.preventDefault();
        }
      });
    };
  }, []);

  const handleScrollToHelp = () => {
    const helpSection = document.getElementById('welcome-page-crows');
    scrollToElement(helpSection, 1500);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App welcome-page">

      <div className="clouds">
        <img src="./image/cloud1.png" alt="nube1" className="cloud-1" />
        <img src="./image/cloud2.png" alt="nube2" className="cloud-2" />
      </div>

      <div className="welcome-page-content">
        <div className="welcome-page-screen-1">
          <div className="welcome-page-screen-1-content">
            <img src="./image/Logo1.png" alt="Logo" className="logo-welcome-big" />
            <div className="welcome-page-screen-1-options">
              <div className="welcome-page-screen-1-options-option welcome-page-screen-1-options-option-help">
                <div>
                  <h1>Ayuda a un creador</h1>
                  <p>Visualiza los <b>CROWS</b> que han publicado los demás usuarios, investiga según tus gustos y si quieres... <b>¡Aporta tu ‘granito de arena’!</b></p>
                </div>

                <button onClick={handleScrollToHelp}>Ayuda</button>
              </div>
              <div className="welcome-page-screen-1-options-option welcome-page-screen-1-options-option-create">
                <div>
                  <h1>¿Tienes un CROW en mente?</h1>
                  <p>Es tu momento para empezar a llevar a cabo esa idea tan genial en la que llevas tanto tiempo pensando y visualizando.</p>
                </div>
                <button onClick={toggleModal}>Crea tu Crow</button>
              </div>
            </div>
          </div>
          <div className="welcome-page-screen-1-3dComponents">
            <img src='./image/3dcomponents.png' alt="3D Components" className="3dComponents" />
          </div>
        </div>
        <div className="social-media-icons">
          <img src="./public/svg/instagram.svg" alt="Instagram" className="social-media-icon" />
          <img src="./public/svg/x.svg" alt="Twitter" className="social-media-icon" />
          <img src="./public/svg/facebook.svg" alt="Facebook" className="social-media-icon" />
          <img src="./public/svg/youtube.svg" alt="YouTube" className="social-media-icon" />
        </div>
      </div>

      <div id="welcome-page-crows" className="welcome-page-content">
        {crows.map((crow, index) => (
          <div key={index} className="crow-item">
            <h3>{crow.titulo}</h3>
            <p>{crow.descripcion}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <LoginModal toggleModal={toggleModal} redirectTo="/home" />
      )}
    </div>
  );
}

export default WelcomePage;
