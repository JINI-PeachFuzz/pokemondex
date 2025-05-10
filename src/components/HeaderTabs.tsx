import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// useNavigate는 버튼 클릭 시 페이지 이동하게 해주는 기능이고 useLocation은 현재 어떤 페이지인지 확인하고 해당버튼에 배경색 입혀주는거
import "./HeaderTabs.css";
import logoImg from "../img/logo.png";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HeaderTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="header-bar">
      <img
        src={logoImg}
        alt="Pokemon"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav-buttons">
        <button
          onClick={() => navigate("/pokedex")}
          className={location.pathname === "/pokedex" ? "active" : ""}
        >
          도감 보기
        </button>
        <button
          onClick={() => navigate("/shadowgame")}
          className={location.pathname === "/shadowgame" ? "active" : ""}
        >
          그림자 맞추기 게임
        </button>
      </div>
    </div>
  );
};

export default HeaderTabs;
