import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/general.css";
import "../styles/HomePage.css";
import Carousel from "../components/Carousel";

const HomePage = () => {
  const images = [
    "./images/carousel1.png",
    "./images/carousel2.png",
    "./images/carousel3.png",
  ];

  return (
    <div className="main-template home-page">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          <div className="carrousel-container-home">
            <Carousel images={images} interval={5000} />
          </div>

          <div className="featured-crows-container-home"></div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
