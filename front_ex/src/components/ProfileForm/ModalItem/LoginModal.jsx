import React, { useState } from "react";
import "../../../css/userForm/LoginModal.css";
import Axios from "axios";

function LoginModal() {
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });

  const userChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onLoginSubmit = async () => {
    await Axios.post("http://localhost:8080/room/login", user).then(
      (result) => {
        // 이거 token 들어잇음
        console.log(result.data);
        setToken(result.data);
      }
    );
    console.log("success login");
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
