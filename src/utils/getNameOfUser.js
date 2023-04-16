import { useContext } from "react";
import MainContext from "../useContext/MainContext";
 
 function getUserName() {
    const {user} = useContext(MainContext);

     const email = user ?.email;
     let userName = email && email.slice(0, email?.indexOf("@"));
     userName = userName && userName.slice(0, 1).toUpperCase() + userName?.slice(1).toLowerCase();
     return userName;
 }

 export default getUserName;