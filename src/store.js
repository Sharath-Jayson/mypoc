import { configureStore } from '@reduxjs/toolkit';
import { reducer as payers } from './reducers/PayerSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  payers: payers
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});

let persistor = persistStore(store);

export { persistor as persistor };
export default store;
