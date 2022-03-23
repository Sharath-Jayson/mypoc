import React from 'react';
import PaymentConfigurationScreen from '../screens/PaymentConfiguration';
import styled from 'styled-components';

const MainContent = styled.div`
  margin-top: 2rem;
`;

const PayerConfigurationPage = () => {
  return (
    <MainContent>
      <PaymentConfigurationScreen />
    </MainContent>
  );
};

export default PayerConfigurationPage;
