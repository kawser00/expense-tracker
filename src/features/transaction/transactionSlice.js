import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, editTransaction, deleteTransaction } from "./transactionAPI";

const initialState  = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editActive:{},
  totalTransactionCount: 0,
};

//async thunks
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async ({type, search, currentPage, totalItemShow,isFilter}) => {
  const transactionsData = await getTransactions({type, search, currentPage, totalItemShow,isFilter});
  return transactionsData;
})

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
  const transaction = await addTransaction(data);
  return transaction;
})

export const changeTransaction = createAsyncThunk('transaction/changeTransaction', async ({id, data}) => {
  const transaction = await editTransaction(id, data);
  return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  const transaction = await deleteTransaction(id);
  return transaction;
})

//create slice
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload
    },
    editInActive: (state, action) => {
      state.editing = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.totalTransactionCount = action.payload.total;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error.message;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(changeTransaction.pending, (state) => {
         state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const indexToUpdate = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);

        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(changeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })

      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.transactions = state.transactions.filter(transaction => transaction.id !== action.meta.arg);
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
  }
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;