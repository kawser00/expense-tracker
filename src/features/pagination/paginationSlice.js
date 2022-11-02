import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: 1,
  totalItemShow: 10,
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    pageSelected: (state, action) => {
      state.currentPage = action.payload;
    },
    totalItemSelected: (state, action) => {
      state.totalItemShow = action.payload;
    },
  }
});

export default paginationSlice.reducer;
export const { pageSelected, totalItemSelected } = paginationSlice.actions;