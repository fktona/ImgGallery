import { useState ,useEffect } from 'react'
import { auth } from "./assets/firebase";
import './App.css'
import {UserContext} from './assets/UserContext'
import RootLayot from "./RootLayot";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      user ? setAuthUser(user) : null;
    });

    return () => {
      listen();
    };
  }, []);
  
  console.log(authUser)
  
  const aboutToSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(false);
        console.log("signOut");
      })
      .catch((error) => {});
  };

  return (
<div>
<UserContext.Provider value= {{authUser ,setAuthUser , aboutToSignOut}} >
      <RootLayot />
    </UserContext.Provider >
</div>
  )
}

export default App
