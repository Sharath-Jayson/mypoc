import React, { useState } from 'react';
import { TheList } from '../../styles/styled-elements';
import styled from 'styled-components';

const PayerForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const PayerItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
  label {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(151, 150, 150);
  }
  input {
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }
  select {
    height: 40px;
    border-radius: 5px;
  }
`;
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
const PayerCheckBox = styled.div`
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

const CreateEditForm = (props) => {
  const [payerId, setPayerId] = useState(props.data.payerId || '');
  const [payerName, setPayerName] = useState(props.data.payerName || '');
  const [tradingPartnerId, setTradingPartnerId] = useState(props.data.tradingPartnerId || '');
  const [transactionTypes, setTransactionTypes] = useState(props.data.transactionTypes || []);
  const [isActive, setIsActive] = useState(
    props.data.isActive === undefined ? true : props.data.active
  );
  const [status, setStatus] = useState(props.data.status || 'dark');

  const resetData = () => {
    setPayerId('');
    setPayerName('');
    setTradingPartnerId('');
    setTransactionTypes([]);
    setIsActive(true);
  };

  const handleSelect = function (selectedItems) {
    const selectedOptions = [];
    for (let i = 0; i < selectedItems.length; i++) {
      selectedOptions.push(selectedItems[i].value);
    }
    setTransactionTypes(selectedOptions);
  };

  return (
    <TheList>
      <h1>{props.formTitle}</h1>
      <PayerForm
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
        <PayerItem>
          <label>Payer ID</label>
          <input
            type="text"
            placeholder="john"
            value={payerId}
            onChange={(e) => setPayerId(e.target.value)}
          />
        </PayerItem>
        <PayerItem>
          <label>Payer Name</label>
          <input
            type="text"
            placeholder="John Smith"
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
          />
        </PayerItem>
        <PayerItem>
          <label>Trading Partner ID</label>
          <input
            type="text"
            placeholder="ISDHdhd"
            value={tradingPartnerId}
            onChange={(e) => setTradingPartnerId(e.target.value)}
          />
        </PayerItem>
        <PayerItem>
          <label>Transaction Types</label>

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
            }}
          >
            <option value="pac">PAC</option>
            <option value="mac">MAC</option>
            <option value="elig">ELIG</option>
          </select>
        </PayerItem>
        <PayerItem>
          <label htmlFor="active"> Is Active</label>
          <PayerCheckBox>
            <input
              type="checkbox"
              name="status"
              checked={isActive}
              onClick={() => {
                setIsActive(!isActive);
              }}
              readOnly
            />
          </PayerCheckBox>
        </PayerItem>

        <PayerItem>
          <label>Status</label>
          <PayerRadioButton>
            <input
              type="radio"
              name="status"
              id="dark"
              checked={status === 'dark'}
              value="dark"
              onChange={() => {
                setStatus('dark');
              }}
            />
            <label htmlFor="Dark">Dark</label>
            <input
              type="radio"
              name="status"
              id="live"
              value="live"
              checked={status === 'live'}
              onChange={() => {
                setStatus('live');
              }}
            />
            <label htmlFor="live">Live</label>
          </PayerRadioButton>
        </PayerItem>

        {/* <PayerItem>
          <PayerCheckBox>
            <label htmlFor="active"> Status</label>
            <input type="checkbox" id="active" name="status" value="active" />
          </PayerCheckBox>
        </PayerItem> */}
        <div>
          <PayerCreateButton type="submit">
            {props.mode === 'CREATE' && 'Create'}
            {props.mode === 'UPDATE' && 'Update'}
          </PayerCreateButton>
          <PayerCreateButton>Cancel</PayerCreateButton>
        </div>
      </PayerForm>
    </TheList>
  );
};

export default CreateEditForm;
