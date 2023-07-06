import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HomeContextProvider } from './context/HomeContext';
import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/login/Login';
import NavBar from './components/NavBar/NavBar';
import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Profiles from './pages/profiles/Profiles';
import ManageProfiles from './pages/profiles/components/ManageProfiles/ManageProfiles';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <HomeContextProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profiles" element={<Profiles/>}/>
            <Route path="/profiles/manage" element={<ManageProfiles/>}/>
            <Route path="/" element={<RequireAuth><NavBar/></RequireAuth>}>
              <Route path="/browse" element={<Browse/>}/>
              <Route path="/search" element={<Search/>}/>
            </Route>
          </Routes>
        </HomeContextProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
