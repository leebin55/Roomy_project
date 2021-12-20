import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  // const [login, setLogin] = useState(false);
  // const [join, setJoin] = useState(false);
  // const [find, setFind] = useState(false);

  const [userProfile, setUserProfile] = useState("");
  const [userId, setUserId] = useState("");
  // useState와 거의 비슷함 사용용도는 user라는 이름으로 사용

  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const [modal, setModal] = useState({
    login: false,
    join: false,
    find: false,
  });

  const loginClick = () => {
    setModal({ login: true, join: false, find: false });
  };
  const joinClick = () => {
    setModal({ login: false, join: true, find: false });
  };
  const findClick = () => {
    setModal({ login: false, join: false, find: true });
  };
  const deleteClick = () => {
    setModal({ login: false, join: false, find: false });
  };
  const [temp, setTemp] = useState(false);
  const [user, setUser] = useState({
    userId: "",
    userPassword: "",
  });
  const data = {
    modal,
    setModal,
    temp,
    user,
    setUser,
    setTemp,
    loginClick,
    joinClick,
    findClick,
    deleteClick,
    cookie,
    setCookie,
    removeCookie,
    userId,
    setUserId,
    // 회원 정보 조회(로그인할때) : 메인화면에서 프로필 보여줄때 사용
    userProfile,
    setUserProfile,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
