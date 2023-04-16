import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import Logo from "../../assets/logo.png";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email");
            break;
          case "auth/user-disabled":
            setError("User account has been disabled");
            break;
          case "auth/user-not-found":
            setError("User not found");
            break;
          case "auth/wrong-password":
            setError("Incorrect password");
            break;
          default:
            setError("Something went wrong. Please try again.");
            break;
        }
      });
  };

  return (
    <div className="relative w-full min-h-screen min-[555px]:bg-login bg-cover bg-fixed bg-no-repeat bg-blend-multiply min-[555px]:bg-black/50 bg-black">
      <div className="min-[555px]:mx-auto max-w-[1180px] p-5">
        <div>
          <img className="min-[555px]:h-[29px] h-12" src={Logo} alt="logo" />
        </div>

        <form
          onSubmit={handleSignIn}
          className="max-md:mt-5 min-h-[640px] max-w-[500px] mx-auto min-[555px]:pt-14 min-[555px]:px-16 min-[555px]:pb-10 bg-black/60 flex flex-col gap-y-8"
        >
          <h2 className="min-[555px]:text-[32px] text-[24px] font-medium text-white">
            Sign In
          </h2>

          {/* error on validation */}
          {error && (
            <p className="bg-red-400 py-3 px-2 text-white rounded-[4px]">
              {error}
            </p>
          )}

          {/* email */}
          <div className="bg-[#333] text-white relative h-12">
            <input
              value={email}
              autoComplete="off"
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input peer`}
            />
            <span className="form-span">Email</span>
          </div>

          {/* password */}
          <div className="bg-[#333] text-white relative h-12">
            <input
              autoComplete="off"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input peer`}
            />
            <span className="form-span">Password</span>
          </div>

          {/* sign in button */}
          <button
            type="submit"
            className={`form-btn outline-1 outline-red-800 bg-[#e50914] mt-2`}
          >
            Sign In
          </button>

          {/* don't have account? */}
          <div className="text-white">
            Don't have an account?
            <Link
              className="ml-2 text-blue-500 text-sm md:hover:opacity-90 duration-300"
              to="/signup"
            >
              Join Netflix Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;