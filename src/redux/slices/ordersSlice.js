import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api/AppApi";

const initialState = {
  cart: {},
  orders: [],
  totalOrders: 0,
  totalItems: 0,
  totalPrice: 0,
  fetchStatus: "idle",
  status: "idle",
  editStatus: "idle",
  error: null,
  needRefresh: true,
};

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await api.getUserOrders(id, params);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const fetchUserOrderById = createAsyncThunk(
  "orders/fetchUserOrderByID",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.getUserOrder(userId, orderId, {
        truncated: false,
      });
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const fetchUserCartById = createAsyncThunk(
  "orders/fetchUserCartById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUserCart(id);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const editUserCart = createAsyncThunk(
  "orders/editUserCart",
  async ({ userId, itemId, amount }, { rejectWithValue }) => {
    try {
      const response = await api.editUserCart(userId, itemId, amount);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const removeFromUserCart = createAsyncThunk(
  "orders/removeFromUserCart",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const response = await api.removeFromUserCart(userId, itemId);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "orders/checkoutCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.checkoutUserCart(userId);
      console.log(response);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const refreshCart = (cart, state) => {
  if (cart.orderItems && cart.orderItems.length) {
    state.totalPrice = countTotalPrice(cart);
    state.totalItems = countItemsAmount(cart);
  }
};

const countTotalPrice = (cart) => {
  return cart.orderItems
    ? cart.orderItems
        .map((item) => item.certificate.price * item.amount)
        .reduce((prevState, currentState) => prevState + currentState)
        .toFixed(2)
    : 0;
};

const countItemsAmount = (cart) => {
  return cart.orderItems
    ? cart.orderItems
        .map((item) => item.amount)
        .reduce((prevState, currentState) => prevState + currentState)
    : 0;
};

const compareCartItems = (itemA, itemB) => {
  if (itemA.id < itemB.id) {
    return -1;
  } else if (itemA.id > itemB.id) {
    return 1;
  }
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    needRefreshEdited(state, action) {
      state.needRefresh = action.payload;
    },
    cartEdited(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserCartById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserCartById.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.orderItems.sort(compareCartItems);
        state.cart = action.payload;
        state.needRefresh = true;
        refreshCart(action.payload, state);
      })
      .addCase(fetchUserCartById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.status;
      })
      .addCase(editUserCart.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editUserCart.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.needRefresh = true;
        refreshCart(state.cart, state);
      })
      .addCase(editUserCart.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(removeFromUserCart.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(removeFromUserCart.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        state.needRefresh = true;
        refreshCart(state.cart, state);
      })
      .addCase(removeFromUserCart.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.orders = action.payload.data.content;
        state.totalOrders = action.payload.data.totalPages;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload.status;
      })
      .addCase(fetchUserOrderById.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchUserOrderById.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        action.payload.data.orderItems.sort(compareCartItems);
        state.cart = action.payload.data;
        state.needRefresh = true;
        refreshCart(action.payload.data, state);
      })
      .addCase(fetchUserOrderById.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload.status;
      });
  },
});

export default ordersSlice.reducer;

export const { needRefreshEdited, cartEdited } = ordersSlice.actions;
