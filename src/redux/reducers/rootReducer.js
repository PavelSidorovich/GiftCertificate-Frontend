import { combineReducers } from "redux";

import authReducer from "../slices/authSlice";
import certificateReducer from "../slices/certificateSlice";
import ordersSlice from "../slices/ordersSlice";
import searchSlice from "../slices/searchSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  certificates: certificateReducer,
  users: userReducer,
  orders: ordersSlice,
  search: searchSlice,
});

export default rootReducer;
