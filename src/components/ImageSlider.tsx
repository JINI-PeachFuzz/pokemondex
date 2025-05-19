import React, { useState } from "react";
import prevIcon from "../img/prev.png";
import nextIcon from "../img/next.png";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={images[current]}
        alt={`배너 ${current + 1}`}
        style={{ width: "90%", maxHeight: "480px", objectFit: "contain", paddingTop: "23px" }}
      />

      <img
        src={prevIcon}
        alt="이전"
        onClick={goToPrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "140px",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      />

      <img
        src={nextIcon}
        alt="다음"
        onClick={goToNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "140px",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ImageSlider;
