import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transaction/transactionSlice';
import filterReducer from '../features/filterTransaction/filterSlice';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
});
