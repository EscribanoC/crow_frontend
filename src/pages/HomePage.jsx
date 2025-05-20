import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import FeaturedCrows from "../components/FeaturedCrows";
import { useNavigate } from "react-router-dom";

import "../styles/general.css";
import "../styles/pages/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const images = [
    "/images/carousel1.png",
    "/images/carousel2.png",
    "/images/carousel3.png",
  ];

  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          <div className="carrousel-container-home home-container">
            <Carousel images={images} interval={5000} />
          </div>

          <div className="featured-crows-container-home home-container">
            <h1 className="section-title">CROWS</h1>
            <FeaturedCrows />
            <div>
              <button
                className="see-more-crows-button"
                onClick={() => navigate("/discover")}
              >
                Descubre más Crows
              </button>
            </div>

            <div className="particles-container">
              <img
                src="./images/featuredCrows-particles1.png"
                className="particles1"
              />
              <img
                src="./images/featuredCrows-particles2.png"
                className="particles2"
              />
              <img
                src="./images/featuredCrows-particles3.png"
                className="particles3"
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
