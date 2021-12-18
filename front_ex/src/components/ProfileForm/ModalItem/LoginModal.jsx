import React, { useState } from "react";
import "../../../css/userForm/LoginModal.css";
import Axios from "axios";
import { useLoginContext } from "../../../context/LoginContextProvider";
import { useCookies } from "react-cookie";

function LoginModal() {
  const {
    setLogin,
    setJoin,
    setFind,
    user,
    setUser,
    temp,
    setTemp,
    setCookie,
  } = useLoginContext();

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onLoginSubmit = async () => {
    await Axios.post("http://localhost:8080/user/login", {
      userId: user.userId,
      userPassword: user.userPassword,
    }).then((res) => {
      console.log("res", res);
      console.log("res.data:", res.data);
      if (res.status === 200) {
        setTemp(true);
        setLogin(false);
        setJoin(false);
        setFind(false);
        // "user" 라고 만들어진 쿠키에 res.data를 담는다. / 경로로 오는거
        setCookie("user", res.data, { path: "/" });
      }
    });
  };
  return (
    <div className="loginItem">
      <div className="loginErr">
        <h1>로그인을 진행해주세요</h1>
      </div>
      <div className="loginForm idForm">
        <input
          name="userId"
          type="text"
          placeholder="CYWORLD ID(아이디)"
          onChange={userChange}
        />
      </div>
      <div className="loginForm pwForm">
        <input
          name="userPassword"
          type="password"
          placeholder="비밀번호"
          onChange={userChange}
        />
      </div>
      <div className="btnLogin">
        <button onClick={onLoginSubmit}>CYWORLD 로그인</button>
      </div>
    </div>
  );
}

export default LoginModal;
