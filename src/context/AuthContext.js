import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        void fetchUserData (decodedToken.sub, token);
      } else {
        setIsAuth( {
          isAuth: false,
          user: null,
          status: 'done'
        });
      }
    }, []);

  function login(accessToken) {
    localStorage.setItem('token', accessToken);
    const decodedToken = jwt_decode(accessToken)

    void fetchUserData(decodedToken.sub, accessToken, '/profile');
    navigate('/profile');
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuth({
      ...isAuth,
      isAuth: false,
      user: null,
      status: 'done',
    })
    console.log('Gebruiker is uitgelogd!');
    navigate('/');
  }

  async function fetchUserData(id, token, redirectUrl) {
    try {
      const result = await axios.get( `http://localhost:3000/600/users/${ id }`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      } );

      // zet de gegevens in de state
      setIsAuth( {
        ...isAuth,
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id,
        },
        status: 'done',
      } );

      if (redirectUrl) {
        navigate(redirectUrl);
      }

    } catch(e) {
      console.error(e);
      setIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }

  const contextData = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      { isAuth.status === 'done' ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;