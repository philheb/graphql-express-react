import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const login = (newToken, userId, tokenExpiration) => {
    setToken(newToken);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
  };
  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, tokenExpiration }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
