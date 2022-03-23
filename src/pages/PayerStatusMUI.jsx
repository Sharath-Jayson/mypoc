import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NavbarSidebar from '../layouts/NavbarSidebar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReusableTable from '../components/ReusableTable';

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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setActiveIndex(newValue);
  };

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
    <>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    payers: state.payers
  };
};

export default connect(mapStateToProps, null)(PayerStatus);
