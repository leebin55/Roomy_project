import React, { createContext, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AppContext = createContext();
export const useLoginContext = () => useContext(AppContext);

function LoginContextProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [join, setJoin] = useState(false);
  const [find, setFind] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['user']);
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState('');

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
    userId: '',
    userPassword: '',
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
    userId,
    setUserId,
    // 회원 정보 조회 : 메인화면에서 조회하고 해당 회원 정보보여줌 > 수정할때도 사용
    userName,
    setUserName,
    userProfile,
    setUserProfile,
    userPassword,
    setUserPassword,
    userEmail,
    setUserEmail,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default LoginContextProvider;
