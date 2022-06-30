import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AUTH_CONTEXT from "../../services/auth/AuthContext";

const initialState = {
  authenticatedUser: null,
  id: null,
  email: null,
  isAdmin: false,
  isLoggedIn: false,
  error: null,
  loginStatus: "idle",
  fetchStatus: "idle",
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AUTH_CONTEXT.login(credentials);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const fetchAuthenticatedUser = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AUTH_CONTEXT.getAuthenticatedUser();
      return response ? response.data : null;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      AUTH_CONTEXT.logout();
      state.authenticatedUser = null;
      state.id = null;
      state.email = null;
      state.isAdmin = false;
      state.isLoggedIn = false;
      state.error = null;
      state.loginStatus = "idle";
      state.fetchStatus = "idle";
    },
    setAuthContext(state) {
      state.isLoggedIn = AUTH_CONTEXT.isLoggedIn();
      if (AUTH_CONTEXT.isLoggedIn()) {
        state.id = AUTH_CONTEXT.getAuthenticatedUserId();
        state.email = AUTH_CONTEXT.getAuthenticatedUserEmail();
        state.isAdmin = AUTH_CONTEXT.isAdmin();
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload.data.message;
      })
      .addCase(fetchAuthenticatedUser.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.authenticatedUser = action.payload;
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action;
        if (action.payload && action.payload.status === 401) {
          state.error = "Session timed out";
        }
      });
  },
});

export const { logout, setAuthContext } = authSlice.actions;

export const isAdmin = (state) => state.auth.isAdmin;

export const isLoggedIn = (state) => state.auth.isLoggedIn;

export const selectEmail = (state) => state.auth.email;

export const selectId = (state) => state.auth.id;

export default authSlice.reducer;
