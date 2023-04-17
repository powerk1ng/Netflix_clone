import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const ShowPassword = ({password, showPass, setShowPass}) => {
  
  const toggleShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      {password && (
        <span onClick={toggleShowPassword} className="pr-2 absolute right-0 top-1/2 -translate-y-1/2">
          {!showPass ? (
            <AiFillEye
              className="hover:brightness-75 duration-500"
              fill="#888787"
            />
          ) : (
            <AiFillEyeInvisible
              className="hover:brightness-75 duration-500"
              fill="#888787"
            />
          )}
        </span>
      )}
    </>
  );
};

export default ShowPassword;
