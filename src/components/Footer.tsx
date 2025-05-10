import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 65px;
  background-color: #333;
  color: white;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      이 사이트는 개인 포트폴리오 용도로 제작되었으며 상업적 용도로 사용되지
      않습니다.
    </StyledFooter>
  );
};

export default Footer;
