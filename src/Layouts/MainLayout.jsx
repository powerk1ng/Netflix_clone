import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SimpleNav from "../components/SimpleNav";

const MainLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/movie");
  

  return (
    <div>
      {hideHeader ? <SimpleNav /> : <Header />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
