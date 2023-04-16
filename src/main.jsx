import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import ReactDOM from "react-dom/client";
import router from "./Routing/routing";
import MainContext from "./useContext/MainContext";


import "./index.css";

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [user, setUser] = useState(null);
  
  
  // reset search input and hide at home comp.
  const resetSearchInput = () => {
    setSearchVal("");
    setToggleSearch(false);
  };

  // add movie to myList
  const movieID = doc(db, 'users', `${user?.email}`)  
  
  

  const saveMovie = async (id, title, img) => {
    if (user?.email) {
      await updateDoc(movieID, {
        saveShows: arrayUnion({
          id: id,
          title: title,
          img: img,
        }),
      });
    }
  };

  // check auth state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  }, []);

  const obj = {
    toggleSearch,
    setToggleSearch,
    resetSearchInput,
    searchVal,
    setSearchVal,
    user,
    saveMovie
  };

  return (
    <MainContext.Provider value={obj}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);