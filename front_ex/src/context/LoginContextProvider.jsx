import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [join, setJoin] = useState(false);
  const [find, setFind] = useState(false);

  const loginClick = () => {
    setLogin(true);
    setJoin(false);
    setFind(false);
  };
  const joinClick = () => {
    setJoin(true);
    setLogin(false);
    setFind(false);
  };
  const findClick = () => {
    setFind(true);
    setLogin(false);
    setJoin(false);
  };
  const data = {
    login,
    setLogin,
    loginClick,
    join,
    setJoin,
    joinClick,
    find,
    setFind,
    findClick,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
