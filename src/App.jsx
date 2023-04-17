import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import router from "./Routing/routing";
import MainContext from "./useContext/MainContext";

const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genreId, setGenreId] = useState(1);

  const resetSearchInput = () => {
    setSearchVal("");
    setToggleSearch(false);
  };

  //reference to a Firestore document 
  const movieID = doc(db, "users", `${user?.email}`);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const obj = {
    toggleSearch,
    setToggleSearch,
    resetSearchInput,
    searchVal,
    setSearchVal,
    user,
    saveMovie,
    loading,
    genreId,
    setGenreId
  };

  return (
    <MainContext.Provider value={obj}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  );
};

export default App;