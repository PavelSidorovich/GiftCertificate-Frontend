import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthContext } from "../../redux/slices/authSlice";

const AuthContext = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthContext());
  }, [dispatch]);

  return props.children;
};

export default AuthContext;
