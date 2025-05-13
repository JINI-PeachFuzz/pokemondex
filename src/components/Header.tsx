import React from "react";
import { useLocation } from "react-router-dom";
// useNavigate는 버튼 클릭 시 페이지 이동하게 해주는 기능이고 useLocation은 현재 어떤 페이지인지 확인하고 해당버튼에 배경색 입혀주는거
import '../App.css';
import logoImg from "../img/logo.png";

const HeaderTabs: React.FC = () => {
  const location = useLocation();

  return (
    <div className="header">
      <img
        src={logoImg}
        alt="Pokemon"
        className="logo"
        onClick={() => (window.location.href = "/")}
      />
      <div className="nav-buttons">
        <button
          onClick={() => (window.location.href = "/pokedex")}
          className={location.pathname === "/pokedex" ? "active" : ""}
        >
          도감 보기
        </button>
        <button
          onClick={() => (window.location.href = "/shadowgame")}
          className={location.pathname === "/shadowgame" ? "active" : ""}
        >
          그림자 게임
        </button>
      </div>
    </div>
  );
};

export default HeaderTabs;
