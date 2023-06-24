import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { getUser, updateUser, userExists } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const navigate = useNavigate();

  // Iniciar sesion con Google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  const logOut = () => {
    signOut(auth);
    sessionStorage.clear()
  }

  useEffect(()=>{
    if (user) {
      navigate("/browse");
    }
  }, [user])

  useEffect(()=>{
    const handleUserChanged = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser) {
        const isRegistered = await userExists(currentUser.uid);
        if (isRegistered) {
          const requestedUser = await getUser(currentUser.uid);
          setUser(requestedUser)
        } else{
          const newUser = {
            id: currentUser.uid,
            mainUser: currentUser.displayName,
            profiles: [
              {
                index: 1,
                profile_name: currentUser.displayName,
                profile_icon: "./images/profile1.png",
                myList: []
              }
            ]
          }
          await updateUser(newUser)
          setUser(newUser);
        }
      } else {
        setUser(null);
        setActiveProfile(null);
      }
    })
    return () => handleUserChanged();
  }, [])

  return(
    <AuthContext.Provider value={{user, activeProfile, setActiveProfile, googleSignIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}