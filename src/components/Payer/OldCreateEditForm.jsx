import React, { useState } from 'react';
import { TheList } from '../../styles/styled-elements';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';

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

const PayerCancelButton = styled.button`
  width: 150px;
  border: none;
  background-color: #b30000;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 40px;
  margin-left: 16px;
  cursor: pointer;
`;

const ErrorText = styled.div`
  color: red;
`

const PayerSchema = Yup.object().shape({
  payerId: Yup.string()
    .matches(/\w$/, 'Must be Digits and Alphabets only')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits')
    .required('Mandatory Field'),
  payerName: Yup.string().required('Mandatory Field'),
  tradingPartnerId: Yup.string()
    .matches(/\w$/, 'Must be Digits and Alphabets only')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits')
});

const CreateEditForm = (props) => {
  const [transactionTypes, setTransactionTypes] = useState(props.data.transactionTypes || []);
  const [isActive, setIsActive] = useState(
    props.data.isActive === undefined ? true : props.data.active
  );
  const [status, setStatus] = useState(props.data.status || 'dark');

  const formik = useFormik({
    initialValues: {
      payerId: props.data.payerId || '',
      payerName: props.data.payerName || '',
      tradingPartnerId: props.data.tradingPartnerId || '',
      transactionTypes: props.data.transactionTypes || [],
      isActive: props.data.isActive === undefined ? true : props.data.active,
      status: props.data.status || 'dark'
    },
    validationSchema: PayerSchema,
    onSubmit: (values, { resetForm }) => {
      if (props.mode == 'CREATE') {
        props.addPayer({
          payerId: values.payerId,
          payerName: values.payerName,
          tradingPartnerId: values.tradingPartnerId,
          transactionTypes: values.transactionTypes,
          isActive: values.isActive,
          status: values.status
        });
        resetForm();
      }

      if (props.mode == 'UPDATE') {
        props.updatePayer({
          payerId: values.payerId,
          payerName: values.payerName,
          tradingPartnerId: values.tradingPartnerId,
          transactionTypes: values.transactionTypes,
          isActive: values.isActive,
          status: values.status
        });
      }
      if (props.onSubmit) {
        props.onSubmit();
      }
    }
  });

  {/*const handleSelect = function (selectedItems) {
  //   const selectedOptions = [];
  //   for (let i = 0; i < selectedItems.length; i++) {
  //     selectedOptions.push(selectedItems[i].value);
  //   }
  //   setTransactionTypes(selectedOptions);
   }; */}

  console.log(formik.errors, formik.values);

  return (
    <TheList>
      <h1>{props.formTitle}</h1>
      <FormikProvider value={formik}>
        <PayerForm onSubmit={formik.handleSubmit}>
          <PayerItem>
            <label>Payer ID</label>
            <input
              type="text"
              placeholder="john"
              // value={payerId}
              // onChange={(e) => setPayerId(e.target.value)}
              name="payerId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.payerId}
            />
            {/* <ErrorMessage name="payerId" /> */}
            {formik.errors.payerId ? <ErrorText>{formik.errors.payerId}</ErrorText> : null}
          </PayerItem>
          <PayerItem>
            <label>Payer Name</label>
            <input
              type="text"
              placeholder="John Smith"
              name="payerName"
              // value={payerName}
              // onChange={(e) => setPayerName(e.target.value)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.payerName}
            />
            {formik.errors.payerName ? <ErrorText>{formik.errors.payerName}</ErrorText> : null}
          </PayerItem>

          <PayerItem>
            <label>Trading Partner ID</label>
            <input
              type="text"
              placeholder="ISDHdhd"
              // value={tradingPartnerId}
              // onChange={(e) => setTradingPartnerId(e.target.value)}
              name="tradingPartnerId"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.tradingPartnerId}
            />
            {formik.errors.tradingPartnerId ? <ErrorText>{formik.errors.tradingPartnerId}</ErrorText> : null}
          </PayerItem>
          <PayerItem>
            <label>Transaction Types</label>
            <Field as="select" name="transactionTypes" multiple>
              <option value="PAC">PAC</option>
              <option value="MAC">MAC</option>
              <option value="ELIG">ELIG</option>
            </Field>
          </PayerItem>
          {/* <PayerItem>
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
        </PayerItem> */}
          <PayerItem>
            <label htmlFor="active"> Is Active</label>
            <PayerCheckBox>
              <input
                type="checkbox"
                name="isActive"
                checked={formik.values.isActive}
                onClick={() => {
                  formik.setFieldValue('isActive', !formik.values.isActive);
                }}
              />
            </PayerCheckBox>
          </PayerItem>

          <PayerItem>
            <label>Status</label>
            <PayerRadioButton>
              <Field type="radio" name="status" value="dark" />
              {/* <input
              type="radio"
              name="status"
              id="dark"
              checked={status === 'dark'}
              value="dark"
              onChange={() => {
                setStatus('dark');
              }}
            /> */}
              <label htmlFor="Dark">Dark</label>
              <Field type="radio" name="status" value="live" />

              {/* <input
              type="radio"
              name="status"
              id="live"
              value="live"
              checked={status === 'live'}
              onChange={() => {
                setStatus('live');
              }}
            /> */}
              <label htmlFor="live">Live</label>
            </PayerRadioButton>
          </PayerItem>

          <div>
            <PayerCreateButton type="submit">
              {props.mode === 'CREATE' && 'Create'}
              {props.mode === 'UPDATE' && 'Update'}
            </PayerCreateButton>
            <PayerCancelButton>Cancel</PayerCancelButton>
          </div>
        </PayerForm>
      </FormikProvider>
    </TheList>
  );
};

export default CreateEditForm;
