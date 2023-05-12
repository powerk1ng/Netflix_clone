import { useContext } from "react";
import MainContext from "../useContext/MainContext";
import { Navigate } from "react-router-dom";

const PrivateLogin = ({ children }) => {
  const { user } = useContext(MainContext);

  if (user?.email) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default PrivateLogin;
