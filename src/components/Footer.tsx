import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
height: 65px;  
background-color: #333;
color: white;
text-align: center;
padding: 20px;
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 1000;
`;

const Footer: React.FC = () => {
  return <StyledFooter>© 2025 Pokemondex. All rights reserved.</StyledFooter>;
};

export default Footer;
