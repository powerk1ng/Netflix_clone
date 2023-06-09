import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import SingleMovie from "../pages/SingleMovie";
import SignUp from "../pages/Authentification/SignUp";
import SignIn from "../pages/Authentification/SignIn";
import PrivateRoute from "./PrivateRoute";
import PrivateLogin from "./PrivateLogin";
import FavouriteMovies from "../pages/FavouriteMovies";
import Error from '../pages/Error';
import Movies from "../pages/Movies";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        errorElement={<Error/>}
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/mylist" element={<FavouriteMovies />} />
      </Route>

      <Route path="/signup" element={<SignUp />} errorElement={<Error/>} />
      <Route
        path="/login"
        errorElement={<Error/>}
        element={
          <PrivateLogin>
            <SignIn />
          </PrivateLogin>
        }
      />
    </>
  )
);

export default router;
