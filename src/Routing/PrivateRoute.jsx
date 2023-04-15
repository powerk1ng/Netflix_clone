import React, { useContext } from "react";
import MainContext from "../useContext/MainContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useContext(MainContext);
  
  if(user === null) {
    return <Navigate to="/login" />  
  } else {
    return children;
  }
}
export default PrivateRoute;
