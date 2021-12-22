import React, { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  const [userProfile, setUserProfile] = useState("");

  // temp -> check_login
  // 로그인 돼있는 상태인지 여부
  const [check_login, setCheck_login] = useState(false);

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

  const data = {
    modal,
    setModal,
    check_login,
    setCheck_login,
    loginClick,
    joinClick,
    findClick,
    deleteClick,
    // 회원 정보 조회(로그인할때) : 메인화면에서 프로필 보여줄때 사용
    userProfile,
    setUserProfile,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
