import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginRight: "10px",
          backgroundColor: location.pathname === "/" ? "#ccc" : "white",
        }}
      >
        도감 보기
      </button>
      <button
        onClick={() => navigate("/shadow")}
        style={{
          backgroundColor: location.pathname === "/shadow" ? "#ccc" : "white",
        }}
      >
        그림자 맞추기 게임
      </button>
    </div>
  );
};

export default HeaderTabs;
