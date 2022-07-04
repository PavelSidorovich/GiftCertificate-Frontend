import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthContext } from "../../redux/slices/authSlice";

const AuthContext = (props) => {
  const [authContextIsReady, setAuthContextIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthContext());
    setAuthContextIsReady(true);
  }, [dispatch]);

  return authContextIsReady ? props.children : null;
};

export default AuthContext;
