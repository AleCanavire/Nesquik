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
    const updateUserActive = async() => {
      await updateUser(user);
    }
    
    if (user) {
      navigate("/browse");
      updateUserActive();
    } else {
      document.title = "Nesquik"
    }
  }, [user])

  useEffect(()=>{
    const update = async() => {
      const indexProfile = user.profiles.findIndex(profile => profile.id === activeProfile.id);

      setUser(prev => {
        const profilesCopy = [...prev.profiles];
        profilesCopy.splice(indexProfile, 1, activeProfile);
        return {...prev, profiles: profilesCopy}
      })
      
    }
    if (activeProfile) {
      update();
    }
  }, [activeProfile])

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
                id: 1,
                profile_name: currentUser.displayName,
                profile_icon: "./images/profile1.png",
                my_list: []
              }
            ]
          }
          await updateUser(newUser);
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