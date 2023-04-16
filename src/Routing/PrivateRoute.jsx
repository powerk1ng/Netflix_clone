import { useContext } from "react";
import MainContext from "../useContext/MainContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(MainContext);

  if (user === null && !loading) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default PrivateRoute;
