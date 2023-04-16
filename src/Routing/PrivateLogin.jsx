import { useContext } from "react";
import MainContext from "../useContext/MainContext";
import { Navigate } from "react-router-dom";

const PrivateLogin = ({ children }) => {
  const { user } = useContext(MainContext);
  return user !== null ? <Navigate to={"/"} /> : children;
};

export default PrivateLogin;