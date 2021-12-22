import React, { useState } from "react";
import "../../../css/userForm/LoginModal.css";
import { useLoginContext } from "../../../context/LoginContextProvider";

function LoginModal() {
  const { setModal, check_login, setCheck_login, setUserProfile } =
    useLoginContext();
  // 로그인폼에 입력한 id, 비밀번호
  const [user, setUser] = useState({ userId: "", userPassword: "" });

  // 로그인폼 입력 onChange
  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  // 로그인 버튼 onClick
  const onLoginSubmit = async () => {
    const res = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      // fetch <-> session 연동 위해 추가해야 할 3가지
      mode: "cors",
      cache: "no-cache", // 필수 아닌듯
      credentials: "include", // cross-origin 호출이라도 언제나 user credentials (쿠키 등) 을 전송함
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        userPassword: user.userPassword,
      }),
    });
    if (res.status === 200) {
      setCheck_login(true);
      setModal({ login: false, join: false, find: false });
    }
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
