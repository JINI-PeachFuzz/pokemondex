import React from "react";
import ImageSlider from "../components/ImageSlider";
import banner1 from "../img/main_banner1.jpg";
import banner2 from "../img/main_banner2.png";
import banner3 from "../img/main_banner3.png";

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <ImageSlider images={[banner1, banner2, banner3]} />
    </div>
  );
};

export default MainPage;
