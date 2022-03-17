import { createSlice } from '@reduxjs/toolkit';
import defaultPayerData from '../assets/defaultData';
import moment from 'moment';

const initialState = defaultPayerData;

const payerConfigSlice = createSlice({
  name: 'payer',

  initialState,

  reducers: {
    createPayerConfig: (state, action) => {
      return [...state, { ...action.payload, updatedOn: moment().format('DD/MM/YYYY') }];
    },

    updatePayerConfig: (state, action) => {
      const indexOfUpdatedPayerId = state.findIndex(
        (payer) => payer['payerId'] == action.payload.payerId
      );

      return [
        ...state.slice(0, indexOfUpdatedPayerId),
        { ...action.payload, updatedOn: moment().format('DD/MM/YYYY') },
        ...state.slice(indexOfUpdatedPayerId)
      ];
    },

    deletePayerConfig: (state, action) => {
      return state.filter((payer) => (payer.payerId !== action.payload.payerId ? true : false));
    }
  }
});

export const { createPayerConfig, updatePayerConfig, deletePayerConfig } = payerConfigSlice.actions;
export const reducer = payerConfigSlice.reducer;
