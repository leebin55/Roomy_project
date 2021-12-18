import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [join, setJoin] = useState(false);
  const [find, setFind] = useState(false);
  // useState와 거의 비슷함 사용용도는 user라는 이름으로 사용
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

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
  const [temp, setTemp] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    userPassword: "",
  });
  const data = {
    login,
    temp,
    user,
    setUser,
    setTemp,
    setLogin,
    loginClick,
    join,
    setJoin,
    joinClick,
    find,
    setFind,
    findClick,
    deleteClick,
    cookie,
    setCookie,
    removeCookie,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
