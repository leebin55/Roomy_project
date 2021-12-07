import React, { useState } from "react";
import { useLoginContext } from "../../../context/LoginContextProvider";
import "../../../css/userForm/JoinModal.css";

function JoinModal() {
  const [join, setJoin] = useState({
    userId: "",
    password: "",
    username: "",
    email: "",
    birth: "",
    gender: 0,
  });
  const onChange = (e) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };
  const joinSubmit = async () => {
    await fetch("http://localhost:8080/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     userId: join.userId,
      //     password: join.password,
      //     username: join.username,
      //     email: join.email,
      //     birth: join.birth,
      //     gender: join.gender,
      //   }),
      body: join,
    });
  };
  return (
    <div className="joinItem">
      <div className="joinBody">
        <label>이름</label>
        <input placeholder="ex)홍길동" name="username" onChange={onChange} />

        <label>생년월일</label>
        <input placeholder="ex)19960826" name="birth" onChange={onChange} />

        <label>성별</label>
        <select className="selectSex">
          <option>남성</option>
          <option>여성</option>
        </select>

        <label>아이디</label>
        <input placeholder="아이디" name="userId" onChange={onChange} />

        <label>비밀번호</label>
        <input placeholder="비밀번호" name="password" onChange={onChange} />

        <label>비밀번호 확인</label>
        <input placeholder="비밀번호 확인" />

        <label>이메일주소</label>
        <input
          placeholder="이메일 주소를 입력해 주세요"
          name="email"
          onChange={onChange}
        />

        <div className="btnForm">
          <button className="btnJoin" onClick={joinSubmit}>
            회원가입 &#x2713;
          </button>
          <button className="btnCancel">가입취소 &times;</button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
