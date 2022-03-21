import React, { useState } from 'react';
import { TheList } from '../../styles/styled-elements';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
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

  const [errors, setErrors] = useState({});

  const resetData = () => {
    setPayerId('');
    setPayerName('');
    setTradingPartnerId('');
    setTransactionTypes([]);
    setIsActive(true);
  };

  const validate = () => {
    let result = {}

    // validate payerId
    if (payerId.length != 5 || !payerId.match(/\w$/)) {
      result['payerId'] = 'Please Enter a Valid PayerID'

    }
    if (!payerName) {
      result['payerName'] = 'This is a required field.'
    }

    // tradingPartnerId is optional 
    if (tradingPartnerId) {
      if (!tradingPartnerId.match(/\w$/)) {
        result['tradingPartnerId'] = "Enter a Valid Trading PartnerID"

      }

    }

    setErrors(result)


    return result;
  }

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
          '& > :not(style)': { m: 1 }
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();

          let validations = validate()

          // if length is greater than 0 it means there are errors
          if (Object.keys(validations).length > 0) {
            // means there are errors so short circuit the function
            return
          }

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
              error={Boolean(errors.payerId)}
              helperText={errors.payerId}
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Name"
              type="text"
              variant="filled"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              error={Boolean(errors.payerName)}
              helperText={errors.payerName}
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
              error={Boolean(errors.tradingPartnerId)}
              helperText={errors.tradingPartnerId}
            />
          </FormControl>
        </FormGroup>

        <FormGroup row>
          <FormControl style={{ width: "33.3%" }}>
            <InputLabel>Transaction Types (Multiple)</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              multiple
              value={transactionTypes}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              onChange={(e) => {
                setTransactionTypes(e.target.value);
              }}
            >
              {['PAC', 'MAC', 'ELIG'].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl component="fieldset" variant="standard" style={{ width: "33.3%" }}>
            <FormLabel component="legend">Active</FormLabel>
            <FormControlLabel
              control={<Checkbox checked={isActive} onChange={() => setIsActive(!isActive)} />}
              label="Is Active"
            />
          </FormControl>


          <FormControl style={{ width: "33.3%" }}>
            <FormLabel>Status</FormLabel>
            <RadioGroup
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel value="live" control={<Radio />} label="Live" />
            </RadioGroup>
          </FormControl>
        </FormGroup>

        <Stack direction="row" spacing={2} justifyContent={"right"}>
          <Button variant="contained" color="error">Cancel</Button>
          <Button variant="contained">

            {props.mode === 'CREATE' && 'Create'}
            {props.mode === 'UPDATE' && 'Update'}
          </Button>
        </Stack>

      </Box>
    </>
  );
};

CreateEditForm.propTypes = {
  data: PropTypes.object,
  mode: PropTypes.string
};

export default CreateEditForm;
