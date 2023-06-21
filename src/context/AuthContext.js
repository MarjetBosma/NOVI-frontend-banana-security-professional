import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending'
  });
  const navigate = useNavigate();

  function login(accessToken) {
    console.log(accessToken)
    const decodedToken = jwt_decode(accessToken);
    localStorage.setItem('token', accessToken);
    console.log(decodedToken)
    setIsAuth({
      ...isAuth,
      isAuth: true,
      user: {
        email: decodedToken.email,
        id: decodedToken.sub,
      }
    })
    console.log('Gebruiker is ingelogd!');
    navigate('/profile');
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuth({
      ...isAuth,
      isAuth: false,
      user: null,
    })
    console.log('Gebruiker is uitgelogd!');
    navigate('/');
  }

  const contextData = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;