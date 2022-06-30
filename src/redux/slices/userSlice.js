import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api/AppApi";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUser(id);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Add any fetched posts to the array
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      });
  },
});

export default usersSlice.reducer;

export const selectUserById = (state, userId) => state.users.user;
