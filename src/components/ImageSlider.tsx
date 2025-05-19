import React, { useState } from "react";
import "./ImageSlider.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <img
        src={images[currentIndex]}
        alt={`banner-${currentIndex}`}
        className="slider-image"
      />
      <button className="slider-btn left" onClick={goToPrev}>
        ‹
      </button>
      <button className="slider-btn right" onClick={goToNext}>
        ›
      </button>
    </div>
  );
};

export default ImageSlider;
