import React from 'react';
import PaymentConfigurationScreen from '../screens/PaymentConfiguration';
import NavbarSidebarLayout from '../layouts/NavbarSidebar';
import styled from 'styled-components';

const MainContent = styled.div`
  margin-top: 2rem;
`;

const PayerConfigurationPage = () => {
  return (
    <NavbarSidebarLayout>
      <MainContent>
        <PaymentConfigurationScreen />
      </MainContent>
    </NavbarSidebarLayout>
  );
};

export default PayerConfigurationPage;
