import {  createSlice } from "@reduxjs/toolkit";

const initialState  = {
  type: '',
  search: '',
};

//create slice
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectedFilterType: (state, action) => {
      state.type = action.payload
    },
    searched: (state, action) => {
      state.search = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { selectedFilterType, searched } = filterSlice.actions;