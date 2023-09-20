import { auth } from "../assets/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../assets/UserContext";

export default function Nav() {
  const Navigate = useNavigate();
  const { authUser, setAuthUser, aboutToSignOut } = useContext(UserContext);
  const [confirm, setConfirm] = useState(false);

  const signing = () => {
    authUser ? setConfirm(true) : Navigate("/login");
  };

  return (
    <div
      className={` bg-white flex z-[5] fixed top-0 w-full justify-between py-2 px-4 items-center shadow-lg `}
    >
      {confirm && authUser && (
        <div className="bg-white absolute top-10 z-[3] shadow-lg right-5 p-3 text-primary flex flex-col gap-2 items-center justify-center text-md ">
          <h1> Do You Want To LogOut </h1>
          <div>
            {" "}
            <button onClick={aboutToSignOut} className="bg-sub p-2 m-4 ">
              {" "}
              Yes{" "}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="bg-sub p-2 m-4 "
            >
              {" "}
              No{" "}
            </button>
          </div>
        </div>
      )}
      <h1 className="relative  text-md text-white font-danc font-bold gradient-text ">
        ViewVault
      </h1>
      {authUser && (
        <h4 className="text-primary font-mono text-sm font-semibold">
          {" "}
          {"Hi, " + auth.currentUser?.email}
        </h4>
      )}
      <button
        onClick={signing}
        className=" relative px-1 bg-primary text-sm  text-white py-1 rounded hover:bg-primary linear text-white"
      >
        {" "}
        {authUser ? "LogOut" : "LogIn"}
      </button>
    </div>
  );
}
