import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// useNavigate는 버튼 클릭 시 페이지 이동하게 해주는 기능이고 useLocation은 현재 어떤 페이지인지 확인하고 해당버튼에 배경색 입혀주는거

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
