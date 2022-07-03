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

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(user);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "users/changeUserPassword",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.changePassword(user);
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
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      })
      .addCase(updateUserById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      })

      .addCase(changeUserPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      });
  },
});

export default usersSlice.reducer;

export const selectUserById = (state, userId) => state.users.user;
