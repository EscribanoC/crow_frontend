import React, { useState, useEffect } from 'react';
import '../styles/WelcomePage.css';
import LoginModal from '../components/LoginModal';

function WelcomePage() {
  const [crows, setCrows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch('http://localhost:8080/api/v1/crows')
      .then((response) => response.json())
      .then((data) => setCrows(data))
      .catch((error) => console.error('Error fetching crows:', error));

    const handleWheel = (event) => {
      const helpSection = document.getElementById('help-section');
      const fullscreenContainer = document.querySelector('.fullscreen-container');

      if (event.deltaY > 0) {
        helpSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        fullscreenContainer.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleWheel);

    window.addEventListener('mousedown', function(e) {
      if (e.button === 1) {
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', function(e) {
        if (e.button === 1) {
          e.preventDefault();
        }
      });
    };
  }, []);

  const handleScrollToHelp = () => {
    document.getElementById('help-section').scrollIntoView({ behavior: 'smooth' });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <div className="fullscreen-container">
        <button onClick={handleScrollToHelp}>Ayuda</button>
        <button onClick={toggleModal}>Crea tu Crow</button>
      </div>

      {showModal && (
        <LoginModal toggleModal={toggleModal} redirectTo="/home"/>
      )}

      <section id="help-section" className="fullscreen-container">
        {crows.map((crow, index) => (
          <div key={index} className="crow-item">
            <h3>{crow.titulo}</h3>
            <p>{crow.descripcion}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default WelcomePage;
