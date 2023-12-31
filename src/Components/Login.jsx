import React, { useState,useContext } from "react";
import { auth } from "../assets/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {ScaleLoader} from "react-spinners"
import { UserContext } from "../assets/UserContext";

function Login() {
  const { authUser } = useContext(UserContext);
  const Navigate = useNavigate();
  const [emptyField, setEmptyField] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userSignIn, setUserSignIn] = useState({
    email: "user@example.com",
    password: "1Password",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setUserSignIn((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };
  const emptyFieldKey = Object.keys(userSignIn).filter(
    (key) => !userSignIn[key]
  );

    const handleSubmit = async (event) => {
  event.preventDefault();

  if (emptyFieldKey.length > 0) {
    setEmptyField(true);
    return;
  }

  try {
    setIsLoading(true);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userSignIn.email,
      userSignIn.password
    );

    setEmptyField(false);
    Navigate('/homepage');
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      
      setIncorrectPassword(true);
    } else if (error.code === "auth/user-not-found") {
    
      setIncorrectEmail(true);
     
    } else {
     
      setSignInError(true);
    }
  } finally {
    setIsLoading(false);
    setEmptyField(false);
  }
};


  return (
    <div className="  h-[100vh] flex gap-3 flex-col items-center justify-center">
      <div className="absolute h-[100vh] object-fill  w-[100vw] p-0 bg-black/[0.33]"></div>
      <h1 className="relative z-[3] top-[-2rem] text-3xl  text-white font-danc font-bold gradient-text ">
        ViewVault
      </h1>
      <img
        src={
          "https://images.unsplash.com/photo-1519560918339-acff526054a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
        }
        width={250}
        className="absolute h-[100vh] object-fill z-[-1] w-[100vw] p-0"
      />

      <div className="login max-w-[90%] lg:max-w-[60%] flex flex-col  items-center p-4 w-full justify-center">
        <h2 className="text-2xl  text-white font-bold mb-4">
          Login To Get Full Access
        </h2>
        {isLoading && <div className="absolute m-auto z-[22] w-[5rem]"><ScaleLoader color="#392724" /></div>}

        <ul className="overflow-hidden">
          {emptyFieldKey.length > 0 &&
            emptyField &&
            emptyFieldKey.map((o) => (
              <li
                key={o}
                className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2"
              >
                Please Enter Your {o}
              </li>
            ))}{" "}
          {incorrectPassword ? (
            <li className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
              {" "}
              INCORRECT PASSWORD
            </li>
          ) : null}
          {incorrectEmail ? (
            <li className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
              {" "}
              USER NOT FOUND
            </li>
          ) : null}
          {signInError ? (
            <span className=" bg-red-700 text-sm py-1 px-3 text-white fillForm mb-2 w_full ">
              {" "}
              Error Occurred
            </span>
          ) : null}
        </ul>

        <form
          onSubmit={handleSubmit}
          className="relative w-full flex  p-3 flex-col opacity-90  justify-center"
        >
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userSignIn.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-white  border-b-2 border-ascent focus:border-primary transition duration-300 font-mono  bg-transparent  "
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userSignIn.password}
              onChange={handleInputChange}
              className="w-full px-3 relative py-2 text-white  border-b-2 border-ascent focus:border-primary transition duration-300 
              font-mono  bg-transparent  "
            />
          </div>
          <button
            onClick={() => {
              setEmptyField(true);
            }}
            type="submit"
            className=" relative px-8 bg-primary mx-auto text-white py-2 rounded hover:bg-primary linear text-white"
          >
            {" "}
            Login
          </button>
        </form>
      </div>
      <p className="mx-auto/ z-[2] font-mono text-lg text-white mt-3 text-sm">
        {" "}
        Explore as a{" "}
        <button onClick={() => Navigate('/homepage')}
        className="relative m-2 p-1 bg-primary  text-white rounded  hover:bg-primary linear text-white">
          {" "}
          Guest
        </button>{" "}
      </p>
    </div>
  );
}

export default Login;
