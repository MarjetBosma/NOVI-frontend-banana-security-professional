import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null
  });
  const navigate = useNavigate();

  function login(accessToken) {
    setIsAuth({
      isAuth: true,
    })
    console.log('Gebruiker is ingelogd!');
    console.log(accessToken)
    navigate('/profile');
  }

  function logout() {
    setIsAuth({
      isAuth: false,
    })
    console.log('Gebruiker is uitgelogd!');
    navigate('/');
  }

  const contextData = {
    isAuth: isAuth,
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