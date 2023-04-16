import LogoutBtn from "./LogoutBtn";
import getUserName from '../utils/getNameOfUser.js';

const UserDropDownMenu = () => {
  const userName = getUserName();

  return (
    <div className="group">
      <div
        className={`relative w-9 h-9 text-center md:inline-block hidden bg-center bg-cover bg-no-repeat border border-gray-400 md:hover:border-red-500 outline-none rounded-md ${
          !userName
            ? "bg-gray-500"
            : userName === "Ken"
            ? "bg-user-ken"
            : "bg-user-other"
        }`}>

        {/* dropdown */}
        <ul className="absolute top-[42px] right-0 w-[130px] bg-black/70 hidden group-hover:block border border-gray-200/80 rounded-md p-2">
          {userName && (
            <p className="text-white mb-3">
            User: <span className="text-green-400 font-bold">{userName}</span>
          </p>
          )}
          <LogoutBtn />
        </ul>
      </div>
    </div>
  );
};

export default UserDropDownMenu;
