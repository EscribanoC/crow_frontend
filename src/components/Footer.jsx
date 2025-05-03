import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-navs">
                <nav className="footer-nav">
                    <h4>Sobre nosotros</h4>
                    <ul>
                        <li><a href="#about">¿Qué es Crow?</a></li>
                        <li><a href="#faq">Preguntas frecuentes</a></li>
                    </ul>
                </nav>
                <nav className="footer-nav">
                    <h4>Atención al cliente</h4>
                    <ul>
                        <li><a href="#help-center">Centro de ayuda</a></li>
                        <li><a href="mailto:info@crow.es">info@crow.es</a></li>
                        <li><a href="tel:+954555555">Teléfono: +954 555 555</a></li>
                    </ul>
                </nav>
            </div>
            <div className="footer-info">
                <div className="footer-company">
                    <p>© 2025 Crow Company</p>
                    <img src="small-logo.png" alt="Crow Logo" className="footer-logo" />
                </div>
                <div className="footer-social">
                    <p>Síguenos en</p>
                    <div className="social-icons">
                        <svg className="social-icon">X</svg>
                        <svg className="social-icon">Instagram</svg>
                        <svg className="social-icon">YouTube</svg>
                        <svg className="social-icon">Facebook</svg>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;