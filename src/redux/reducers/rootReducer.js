import { combineReducers } from "redux";

import authReducer from "../slices/authSlice";
import certificateReducer from "../slices/certificateSlice";
import userReducer from "../slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  certificates: certificateReducer,
  users: userReducer,
});

export default rootReducer;
