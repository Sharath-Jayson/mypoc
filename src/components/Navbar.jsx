import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: #090C9B;
    position: sticky;
    top: 0;
    z-index: 999;
`;
const NavbarWrapper = styled.div`
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Logo = styled.span`
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
`;
const TopLeft = styled.div`
    // display: flex;
    // align-items: center;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarWrapper>
        <TopLeft>
          <Logo>Payer Project</Logo>
        </TopLeft>
      </NavbarWrapper>
    </NavbarContainer>
  );
}

export default Navbar;
