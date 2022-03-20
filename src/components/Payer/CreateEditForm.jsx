import React, { useState } from 'react';
import { TheList } from '../../styles/styled-elements';
import styled from 'styled-components';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from "@material-ui/core/RadioGroup";
import Checkbox from '@mui/material/Checkbox';
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { Input } from '@material-ui/core';
import Box from '@mui/material/Box';


const PayerRadioButton = styled.div`
  input {
    margin-top: 15px;
  }
  label {
    margin: 10px;
    font-size: 18px;
    color: #555;
  }
`;
const PayerCreateButton = styled.button`
  width: 150px;
  border: none;
  background-color: #1876f2;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 40px;
  cursor: pointer;
`;

// https://mui.com/components/selects/#multiple-select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const CreateEditForm = (props) => {
  const [payerId, setPayerId] = useState(props.data.payerId || '');
  const [payerName, setPayerName] = useState(props.data.payerName || '');
  const [tradingPartnerId, setTradingPartnerId] = useState(props.data.tradingPartnerId || '');
  const [transactionTypes, setTransactionTypes] = useState(props.data.transactionTypes || []);
  const [isActive, setIsActive] = useState(
    props.data.isActive === undefined ? true : props.data.isActive
  );
  const [status, setStatus] = useState(props.data.status || 'dark');

  const resetData = () => {
    setPayerId('');
    setPayerName('');
    setTradingPartnerId('');
    setTransactionTypes([]);
    setIsActive(true);
  };

  return (
    <>
      <h1>{props.formTitle}</h1>
      {/* <Box sx={{
        '& > :not(style)': { m: 1 },
      }}> */}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();

          if (props.mode == 'CREATE') {
            props.addPayer({
              payerId,
              payerName,
              tradingPartnerId,
              transactionTypes,
              isActive,
              status
            });
            resetData();
          }

          if (props.mode == 'UPDATE') {
            props.updatePayer({
              payerId,
              payerName,
              tradingPartnerId,
              transactionTypes,
              isActive,
              status
            });
          }
          if (props.onSubmit) {
            props.onSubmit();
          }
        }}
      >
        <FormGroup row>

          <FormControl>

            <TextField
              label="Payer ID"
              type="text"
              variant="filled"
              value={payerId}
              onChange={(e) => setPayerId(e.target.value)}
            />
          </FormControl>

          <FormControl>

            <TextField
              label="Name"
              type="text"
              variant="filled"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Partner ID"
              type="text"
              placeholder="Partner ID"
              value={tradingPartnerId}
              variant="filled"
              onChange={(e) => setTradingPartnerId(e.target.value)}
            />
          </FormControl>
        </FormGroup>


        <FormGroup row>

          <FormControl>

            <InputLabel >Transaction Types (Multiple)</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              multiple
              value={transactionTypes}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              onChange={
                (e) => {
                  setTransactionTypes(e.target.value)
                }
              }
            >
              {['PAC', 'MAC', 'ELIG'].map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
          {/* <label>Transaction Types</label>

          <select
            size="3"
            style={{ height: '5rem' }}
            className="newUserSelect"
            name="active"
            id="active"
            multiple
            value={transactionTypes}
            onChange={(e) => {
              handleSelect(e.target.selectedOptions);
            }}>
            <option value="pac">PAC</option>
            <option value="mac">MAC</option>
            <option value="elig">ELIG</option>
          </select> */}


          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Active</FormLabel>
            <FormControlLabel
              control={<Checkbox checked={isActive} onChange={() => setIsActive(!isActive)} />} label="Is Active" />
          </FormControl>

          <FormControl>
          </FormControl>


          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              value={status}
              onChange={(e) => { setStatus(e.target.value) }}
            >
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel value="live" control={<Radio />} label="Live" />
            </RadioGroup>

          </FormControl>


        </FormGroup>

        <div>
          <PayerCreateButton type="submit">
            {props.mode === 'CREATE' && 'Create'}
            {props.mode === 'UPDATE' && 'Update'}
          </PayerCreateButton>
          <PayerCreateButton>Cancel</PayerCreateButton>
        </div>
      </Box>
    </>
  );
};

export default CreateEditForm;
