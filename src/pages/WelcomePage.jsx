import React, { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import FeaturedCrows from "../components/FeaturedCrows";

import { scrollToElement } from "../js/smooth-scroll";

import "../styles/WelcomePage.css";
import "../styles/components/welcomeButton.css";

import InstagramIcon from "../assets/svg/instagram.svg?react";
import FacebookIcon from "../assets/svg/facebook.svg?react";
import YoutubeIcon from "../assets/svg/youtube.svg?react";
import XIcon from "../assets/svg/x.svg?react";

function WelcomePage() {
  const [showModal, setShowModal] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [isModalToggling, setIsModalToggling] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      const helpSection = document.getElementById(
        "featured-crows-container-welcome"
      );
      const fullscreenContainer = document.querySelector(
        ".welcome-page-content"
      );

      if (event.deltaY > 0) {
        scrollToElement(helpSection, 1500);
      } else {
        scrollToElement(fullscreenContainer, 1500);
      }
    };

    window.addEventListener("wheel", handleWheel);

    window.addEventListener("mousedown", function (e) {
      if (e.button === 1) {
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", function (e) {
        if (e.button === 1) {
          e.preventDefault();
        }
      });
    };
  }, []);

  const handleScrollToHelp = () => {
    const pageCrows = document.getElementById(
      "featured-crows-container-welcome"
    );
    scrollToElement(pageCrows, 1500);
  };

  const toggleModal = () => {
    if (isModalToggling) return;
    setIsModalToggling(true);

    animateContent ? setAnimateContent(false) : setAnimateContent(true);
    setTimeout(() => {
      setShowModal(!showModal);
      setIsModalToggling(false);
    }, 1000);
  };

  return (
    <div className="App welcome-page">
      <div className="clouds">
        <img src="./images/cloud1.png" alt="nube1" className="cloud-1" />
        <img src="./images/cloud2.png" alt="nube2" className="cloud-2" />
      </div>

      <div
        className={`welcome-page-content ${
          animateContent ? "animate-out" : "animate-in"
        }`}
      >
        <div className="welcome-page-screen-1">
          <div className="welcome-page-screen-1-content">
            <img
              src="./images/Logo1.png"
              alt="Logo"
              className="logo-welcome-big"
            />
            <div className="welcome-page-screen-1-options">
              <div className="welcome-page-screen-1-options-option welcome-page-screen-1-options-option-help">
                <div>
                  <h1>Ayuda a un creador</h1>
                  <p>
                    Visualiza los <b>CROWS</b> que han publicado los demás
                    usuarios, investiga según tus gustos y si quieres...{" "}
                    <b>¡Aporta tu ‘granito de arena’!</b>
                  </p>
                </div>

                <button className="welcome-button" onClick={handleScrollToHelp}>
                  Ayuda
                </button>
              </div>
              <div className="welcome-page-screen-1-options-option welcome-page-screen-1-options-option-create">
                <div>
                  <h1>¿Tienes un CROW en mente?</h1>
                  <p>
                    Es tu momento para empezar a llevar a cabo esa idea tan
                    genial en la que llevas tanto tiempo pensando y
                    visualizando.
                  </p>
                </div>
                <button className="welcome-button" onClick={toggleModal}>
                  Crea tu Crow
                </button>
              </div>
            </div>
          </div>
          <div className="welcome-page-screen-1-3dComponents">
            <img
              src="./images/3dcomponents.png"
              alt="3D Components"
              className="3dComponents"
            />
          </div>
        </div>
        <div className="social-media-icons">
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <XIcon className="social-media-icon" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="social-media-icon" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon className="social-media-icon" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="social-media-icon" />
          </a>
        </div>
      </div>

      <div
        id="featured-crows-container-welcome"
        className="welcome-page-content featured-crows-container-welcome"
      >
        <FeaturedCrows />
      </div>

      {showModal && (
        <LoginModal
          toggleModal={toggleModal}
          redirectTo="/home"
          animateContent={animateContent}
        />
      )}
    </div>
  );
}

export default WelcomePage;
