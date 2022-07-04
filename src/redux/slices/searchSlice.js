import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  needRedirect: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchValueUpdated(state, action) {
      state.searchValue = action.payload;
    },
    needRedirectUpdated(state, action) {
      state.needRedirect = action.payload;
    },
  },
});

export const { needRedirectUpdated, searchValueUpdated } = searchSlice.actions;

export const selectSearchValue = (state) => state.search.searchValue;

export const selectNeedRedirect = (state) => state.search.needRedirect;

export default searchSlice.reducer;
