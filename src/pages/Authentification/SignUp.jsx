import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

import Logo from "../../assets/logo.png";
import signUpSchema from "./signUpSchema.js";
import ShowPassword from "./ShowPassword";

const SignUp = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if(location.pathname === '/signup') {
      document.title = 'Sign Up'
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen min-[555px]:bg-login bg-cover bg-fixed bg-no-repeat bg-blend-multiply min-[555px]:bg-black/50 bg-black">
      <div className="min-[555px]:mx-auto max-w-[1180px] p-5">
        <div>
          <img className="min-[555px]:h-[29px] h-12" src={Logo} alt="logo" />
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            accept: false,
          }}
          validationSchema={signUpSchema}
          onSubmit={(values, { resetForm }) => {
            if (!values.accept) {
              setError("Please accept the terms and conditions");
              return;
            }

            setDoc(doc(db, "users", values.email), {
              savedShows: [],
            });

            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                setFormSubmitted(true);
                setError("");
                setTimeout(() => {
                  setFormSubmitted(false);
                  resetForm();
                  navigate("/");
                }, 150);
              })
              .catch((error) => {
                switch (error.code) {
                  case "auth/email-already-in-use":
                    setError("Email is already in use");
                    break;
                  case "auth/too-many-requests":
                    setError("Too many requests, try again later");
                    break;
                  default:
                    setError("Network request failed");
                    break;
                }
                setFormSubmitted(false);
              });
          }}
        >
          {({ errors, touched, values }) => (
            <Form className="max-md:mt-5 min-h-[640px] max-w-[500px] mx-auto min-[555px]:pt-14 min-[555px]:px-16 min-[555px]:pb-10 bg-black/60 flex flex-col gap-y-10">
              <h2 className="min-[555px]:text-[32px] text-[24px] font-medium text-white">
                Sign Up
              </h2>

              {error && (
                <p
                  className={`bg-red-400 py-3 px-2 text-white rounded-[4px] transition-opacity duration-500 ${
                    error ? "opacity-1" : "opacity-0"
                  }`}
                >
                  {error}
                </p>
              )}

              {/* email */}
              <div className="bg-[#333] text-white relative h-12">
                <Field
                  autoComplete="off"
                  required
                  name="email"
                  type="text"
                  className={`form-input peer ${
                    errors.email && touched.email ? "border-b-[#E87C03]" : ""
                  }`}
                />
                <span className="form-span">Email</span>

                {errors.email && touched.email && (
                  <p className="form-error">{errors.email}</p>
                )}
              </div>

              {/* password */}
              <div className="bg-[#333] text-white relative h-12">
                <Field
                  required
                  name="password"
                  type={showPass ? "text" : "password"}
                  className={`form-input peer ${
                    errors.password && touched.password
                      ? "border-b-[#E87C03]"
                      : ""
                  }`}
                />
                <span className="form-span">Password</span>
                {errors.password && touched.password && (
                  <p className="form-error">{errors.password}</p>
                )}

                {values.password && (
                  <ShowPassword
                    password={values.password}
                    showPass={showPass}
                    setShowPass={setShowPass}
                  />
                )}
              </div>

              {/* reconfirm password */}
              <div className="bg-[#333] text-white relative h-12">
                <Field
                  required
                  name="confirmPassword"
                  type={showConfirmPass ? 'text' : 'password'}
                  className={`form-input peer ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-b-[#E87C03]"
                      : ""
                  }`}
                />
                <span className="form-span">Password</span>

                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword}</p>
                )}

                <ShowPassword
                    password={values.confirmPassword}
                    showPass={showConfirmPass}
                    setShowPass={setShowConfirmPass}
                  />
              </div>

              {/* acceot terms */}
              <div className="flex items-center gap-x-2">
                <Field
                  name="accept"
                  className="text-red-500"
                  type="checkbox"
                  id="terms"
                />
                <Link className="text-white">Accept terms</Link>
              </div>

              <button
                disabled={formSubmitted ? true : false}
                type="submit"
                className={`form-btn ${
                  formSubmitted ? "bg-green-500" : "bg-[#e50914]"
                }`}
              >
                {formSubmitted ? "Registration is successful" : "Sign Up"}
              </button>

              {/* new to netflix? */}
              <div className="text-white">
                Already have an account?{" "}
                <Link
                  className="ml-1 text-blue-500 text-sm md:hover:opacity-90 duration-300"
                  to="/login"
                >
                  Sign In
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
