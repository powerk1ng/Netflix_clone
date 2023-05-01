import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const LogoutBtn = ({className}) => {
  const navigate = useNavigate();
  
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
    </div>
  );
};

export default LogoutBtn;
