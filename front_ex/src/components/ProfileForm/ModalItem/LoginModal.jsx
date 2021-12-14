import React, { useState } from "react";
import "../../../css/userForm/LoginModal.css";
import Axios from "axios";
import { useLoginContext } from "../../../context/LoginContextProvider";

function LoginModal() {
  const { setLogin, setJoin, setFind, user, setUser, temp, setTemp } =
    useLoginContext();

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onLoginSubmit = async () => {
    // await Axios.post("http://localhost:8080/room/login", user).then(
    //   (result) => {
    //     // 이거 token 들어잇음
    //     console.log(result.data);
    //     setToken(result.data);
    //   }
    // );
    // console.log("success login");
    await Axios.post("http://localhost:8080/room/login", {
      userId: user.userId,
      password: user.password,
    }).then((res) => {
      console.log("res", res);
      console.log("res.data:", res.data);
      if (res.status === 200) {
        setTemp(true);
        setLogin(false);
        setJoin(false);
        setFind(false);
      }
    });
  };
  return (
    <div className="loginItem">
      <div className="loginErr">
        <h1>로그인을 진행해주세요{temp.userId}</h1>
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
          name="password"
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
