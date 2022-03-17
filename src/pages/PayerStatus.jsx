import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NavbarSidebar from '../layouts/NavbarSidebar';

const PageContainer = styled.div`
    flex: 4;
    padding left : 1rem;
`;

const StyledTable = styled.table`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    th {
      background-color: #59bfff;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

const PayerStatus = (props) => {
  const activePayer = 'ACTIVE_PAYER';
  const inactivePayer = 'INACTIVE_PAYER';

  const [active, setActive] = useState(activePayer);

  console.log(props);

  const activeData = props.payers.filter((p) => p.isActive);
  const inactiveData = props.payers.filter((p) => p.isActive === false);

  console.log(activeData, inactiveData);

  return (
    <NavbarSidebar>
      <PageContainer>
        <ButtonGroup>
          <Tab active={active == activePayer} onClick={() => setActive(activePayer)}>
            Active Payer
          </Tab>
          <Tab active={active == inactivePayer} onClick={() => setActive(inactivePayer)}>
            Inactive Payer
          </Tab>
        </ButtonGroup>

        {active === activePayer && (
          <>
            <StyledTable>
              <table>
                <thead>
                  <tr>
                    <th>Payer ID</th>
                    <th>Payer Name</th>
                    <th>Trading Partner Id</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.map((payer, i) => (
                    <tr key={i}>
                      <td>{payer.payerId}</td>
                      <td>{payer.payerName}</td>
                      <td>{payer.tradingPartnerId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledTable>
          </>
        )}

        {active === inactivePayer && (
          <>
            <StyledTable>
              <table>
                <thead>
                  <tr>
                    <th>Payer ID</th>
                    <th>Payer Name</th>
                    <th>Trading Partner Id</th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveData.map((payer, i) => (
                    <tr key={i}>
                      <td>{payer.payerId}</td>
                      <td>{payer.payerName}</td>
                      <td>{payer.tradingPartnerId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledTable>
          </>
        )}
      </PageContainer>
    </NavbarSidebar>
  );
};

const mapStateToProps = (state) => {
  return {
    payers: state.payers
  };
};

export default connect(mapStateToProps, null)(PayerStatus);
