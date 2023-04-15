import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MainContext from "../useContext/MainContext";

const LogoutBtn = ({className}) => {
  const navigate = useNavigate();
  const {user} = useContext(MainContext);

  const email = user?.email;
  let userName = email?.slice(0, email?.indexOf('@'));
  userName = userName?.slice(0, 1).toUpperCase() + userName?.slice(1).toLowerCase(); 
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={className} style={{position: 'relative'}}>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white md:hover:opacity-90 duration-200 peer">
        Log out
      </button>
      <span className="text-center invisible opacity-0 peer-hover:md:opacity-100 peer-hover:md:visible text-white absolute right-3 -bottom-[3rem] text-[10px] bg-green-700 p-1.5 rounded-md duration-500">{`Log out from ${userName}?`}</span>
    </div>
  );
};

export default LogoutBtn;
