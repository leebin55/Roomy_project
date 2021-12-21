import React, { useState } from "react";
import "../../../css/userForm/LoginModal.css";
import Axios from "axios";
import { useLoginContext } from "../../../context/LoginContextProvider";
import { useCookies } from "react-cookie";

Axios.defaults.withCredentials = true;

function LoginModal() {
  const { setModal, temp, setTemp, setCookie, setUserProfile } =
    useLoginContext();

  const [user, setUser] = useState({ userId: "", userPassword: "" });

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onLoginSubmit = async () => {
    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        userPassword: user.userPassword,
      }),
    });
    if (res.status === 200) {
      setTemp(true);
      setModal({ login: false, join: false, find: false });
    }

    // .then((result) => {

    // if (data) {
    //   // setUserProfile(data.userProfile);
    // }

    // "user" 라고 만들어진 쿠키에 res.data를 담는다. / 경로로 오는거
    // setCookie("user", data, { path: "/" });
    // });

    // await Axios.post(
    //   "http://localhost:8080/user/login",
    //   {
    //     userId: user.userId,
    //     userPassword: user.userPassword,
    //   },
    //   { withCredentials: true }
    // ).then((res) => {
    //   console.log("res", res);
    //   console.log("res.data:", res.data);
    //   if (res.status === 200) {
    //     setTemp(true);
    //     setModal({ login: false, join: false, find: false });
    //     // "user" 라고 만들어진 쿠키에 res.data를 담는다. / 경로로 오는거
    //     setUserProfile(res.data.userProfile);
    //     setCookie("user", res.data, { path: "/" });
    //   }
    // });
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
