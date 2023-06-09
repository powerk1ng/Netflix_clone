import LogoutBtn from "./LogoutBtn";
import getUserName from '../../utils/getNameOfUser.js';
import userLogo from '../../assets/user-logo.png';
import otherUser from '../../assets/user-other.jpeg';

const UserDropDownMenu = () => {
  const userName = getUserName();

  return (
    <div className="group">
      <div
        className={`relative w-9 h-9 text-center md:inline-block hidden bg-center bg-cover bg-no-repeat border border-gray-400 md:hover:border-red-500 outline-none rounded-md ${!userName ? 'bg-gray-400' : ''}`}
        style={{ backgroundImage: userName === 'Ken' ? `url(${userLogo})` : `url(${otherUser})` }}
      >

        {/* dropdown */}
        <ul className="absolute hidden group-hover:block duration-300 top-[42px] right-0 w-[130px] bg-black/70 border border-gray-200/80 rounded-md p-3 min-w-[150px]">
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
