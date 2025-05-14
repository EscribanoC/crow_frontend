import React, { useEffect, useRef, useState } from "react";
import "../styles/components/Carousel.css";

const Carousel = ({ images, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goTo = (index) => {
    resetTimeout();
    setCurrent(index);
  };

  const goToNext = () => {
    goTo((current + 1) % images.length);
  };

  const goToPrev = () => {
    goTo((current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, interval);
    return () => resetTimeout();
  }, [current]);

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className="carousel-slide"
            alt={`slide-${index}`}
          />
        ))}
      </div>
      <button className="carousel-button left" onClick={goToPrev}>
        ◀
      </button>
      <button className="carousel-button right" onClick={goToNext}>
        ▶
      </button>
    </div>
  );
};

export default Carousel;
