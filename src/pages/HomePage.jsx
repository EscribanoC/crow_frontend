import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/general.css";
import "../styles/HomePage.css";
import Carousel from "../components/Carousel";

const HomePage = () => {
  const images = [
    "../../public/images/carousel1.png",
    "../../public/images/carousel2.png",
    "../../public/images/carousel3.png",
  ];

  return (
    <div className="main-template home-page">
      <div className="main-template-content">
        <Header />
        <main className="main-container">
          <div className="carrousel-container">
            <Carousel images={images} interval={5000} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
