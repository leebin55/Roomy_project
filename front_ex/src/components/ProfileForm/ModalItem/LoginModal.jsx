import React from "react";
import "../../../css/userForm/LoginModal.css";

function LoginModal() {
  return (
    <div className="loginItem">
      <div className="loginErr">
        <h1>로그인을 진행해주세요</h1>
      </div>
      <div className="loginForm idForm">
        <input type="text" placeholder="CYWORLD ID(아이디)" />
      </div>
      <div className="loginForm pwForm">
        <input type="text" placeholder="비밀번호" />
      </div>
      <div className="btnLogin">
        <button>CYWORLD 로그인</button>
      </div>
    </div>
  );
}

export default LoginModal;
