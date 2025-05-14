import React from "react";
import "../styles/components/Footer.css";
import InstagramIcon from "../assets/svg/instagram.svg?react";
import FacebookIcon from "../assets/svg/facebook.svg?react";
import YoutubeIcon from "../assets/svg/youtube.svg?react";
import XIcon from "../assets/svg/x.svg?react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-navs">
          <nav className="footer-nav">
            <h4>Sobre nosotros</h4>
            <ul>
              <li>
                <a href="#about">¿Qué es Crow?</a>
              </li>
              <li>
                <a href="#faq">Preguntas frecuentes</a>
              </li>
            </ul>
          </nav>
          <nav className="footer-nav">
            <h4>Atención al cliente</h4>
            <ul>
              <li>
                <a href="#help-center">Centro de ayuda</a>
              </li>
              <li>
                <a href="mailto:info@crow.es">info@crow.es</a>
              </li>
              <li>
                <a href="tel:+954555555">Teléfono: +954 555 555</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-separator"></div>

        <div className="footer-info">
          <div className="footer-company">
            <p>© 2025 Crow Company</p>
            <img
              src="./images/Logo3.png"
              alt="Crow Logo"
              className="footer-logo"
            />
          </div>
          <div className="footer-social">
            <p>Síguenos en</p>
            <div className="social-icons">
              <XIcon className="social-media-icon" />
              <InstagramIcon className="social-media-icon" />
              <YoutubeIcon className="social-media-icon" />
              <FacebookIcon className="social-media-icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
