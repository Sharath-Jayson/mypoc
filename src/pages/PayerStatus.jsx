import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NavbarSidebar from '../layouts/NavbarSidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReusableTable from '../components/ReusableTable';

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

const MyTab = styled.button`
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

// mui tabpanel
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const PayerStatus = (props) => {
  const activePayer = 'ACTIVE_PAYER';
  const inactivePayer = 'INACTIVE_PAYER';

  const [active, setActive] = useState(activePayer);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveIndex(newValue);
  };

  console.log(props);

  const activeData = props.payers.filter((p) => p.isActive);
  const inactiveData = props.payers.filter((p) => p.isActive === false);

  const columns = useMemo(() => [
    {
      Header: 'Payer ID',
      accessor: 'payerId'
    },
    {
      Header: 'Payer Name',
      accessor: 'payerName'
    },
    {
      Header: 'Trading Partner ID',
      accessor: 'tradingPartnerId'
    }
  ]);

  console.log(activeData, inactiveData);

  return (
    <NavbarSidebar>
      <PageContainer>
        {/* CReated using react tabs
        <ButtonGroup>
          <MyTab active={active == activePayer} onClick={() => setActive(activePayer)}>
            Active Payer
          </MyTab>
          <MyTab active={active == inactivePayer} onClick={() => setActive(inactivePayer)}>
            Inactive Payer
          </MyTab>
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
        )} */}

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeIndex}
            onChange={handleChangeTab}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
          >
            <Tab label="Active Payer" />
            <Tab label="Inactive Payer" />
          </Tabs>
        </Box>
        <TabPanel value={activeIndex} index={0}>
          <ReusableTable
            columns={columns}
            data={activeData}
            initialState={{ sortBy: [{ id: 'payerId', desc: false }] }}
          />
        </TabPanel>
        <TabPanel value={activeIndex} index={1}>
          <ReusableTable
            columns={columns}
            data={inactiveData}
            initialState={{ sortBy: [{ id: 'payerId', desc: false }] }}
          />
        </TabPanel>
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
