import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  height: 80px;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Footer: React.FC = () => {
  return <StyledFooter>© 2025 Togemory. All rights reserved.</StyledFooter>;
};

export default Footer;
