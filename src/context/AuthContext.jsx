import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { getUser, updateUser, userExists } from '../firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activeProfile, setActiveProfile] = useState(null);
  const [profileSettings, setProfileSettings] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      updateUserActive();
    } else {
      document.title = "Nesquik"
    }
  }, [user])

  useEffect(()=>{
    const updateProfile = () => {
      const indexProfile = user.profiles.findIndex(profile => profile.id === activeProfile.id);
      setUser(prev => {
        const profilesCopy = [...prev.profiles];
        profilesCopy.splice(indexProfile, 1, activeProfile);
        return {
          ...prev,
          profiles: profilesCopy
        }
      })
    }

    if (activeProfile) {
      updateProfile();
    }
  }, [activeProfile])

  useEffect(()=>{
    const handleUserChanged = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser) {
        const isRegistered = await userExists(currentUser.uid);
        if (isRegistered) {
          const requestedUser = await getUser(currentUser.uid);
          setUser(requestedUser)
          if (location.pathname === "/login"){
            navigate("/profiles");
          }
        } else{
          const newUser = {
            id: currentUser.uid,
            mainUser: currentUser.displayName,
            profiles: [
              {
                id: 1,
                profile_name: currentUser.displayName.split(" ")[0],
                profile_icon: "/images/profile1.png",
                my_list: []
              }
            ]
          }
          await updateUser(newUser);
          setUser(newUser);
          if (location.pathname === "/login"){
            setProfileSettings(newUser.profiles[0]);
            setShowEditor(true);
            navigate("/profiles/manage");
          }
        }
      } else {
        setUser(null);
        setActiveProfile(null);
      }
    })
    return () => handleUserChanged();
  }, [])

  return(
    <AuthContext.Provider value={{user, activeProfile, profileSettings, showEditor, showIcons, setShowIcons, setUser, setActiveProfile, setProfileSettings, setShowEditor, googleSignIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}