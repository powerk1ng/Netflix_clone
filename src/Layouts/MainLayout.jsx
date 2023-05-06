import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SimpleNav from "../components/SimpleNav";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/movie") && location.pathname !== '/movies';
  

  return (
    <div>
      {hideHeader ? <SimpleNav /> : <Header />}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
