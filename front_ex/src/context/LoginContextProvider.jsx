import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [join, setJoin] = useState(false);
  const [find, setFind] = useState(false);

  const loginClick = () => {
    if (join === true) {
      setJoin(false);
    } else if (find === true) {
      setFind(false);
    }
    setLogin(true);
  };
  const joinClick = () => {
    if (login === true) {
      setLogin(false);
    } else if (find === true) {
      setFind(false);
    }
    setJoin(true);
  };
  const findClick = () => {
    if (login === true) {
      setLogin(false);
    } else if (join === true) {
      setJoin(false);
    }
    setFind(true);
  };
  const deleteClick = () => {
    setLogin(false);
    setJoin(false);
    setFind(false);
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
    deleteClick,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
