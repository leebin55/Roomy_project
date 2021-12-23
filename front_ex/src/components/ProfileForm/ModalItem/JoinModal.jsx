import React, { useState } from "react";
import "../../../css/userForm/JoinModal.css";
import { useLoginContext } from "../../../context/LoginContextProvider";

function JoinModal() {
  const { loginClick, deleteClick } = useLoginContext();

  // 입력
  const [join, setJoin] = useState({
    userId: "",
    password: "",
    re_password: "",
    username: "",
    email: "",
    birth: "",
    userGender: "",
  });

  // 성별 고르기
  const onSelect = (e) => {
    setJoin({ ...join, gender: e.target.value });
    //console.log(join.gender);
  };
  // input값 가져오기
  const onItemChange = (e) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };

  const joinSubmit = async () => {
    if (join.userName === "") {
      alert("이름을 입력해주세요.");
    } else if (join.userBirth === "") {
      alert("생년월일을 입력해주세요.");
    } else if (join.userId === "") {
      alert("아이디를 입력해주세요.");
    } else if (join.userEmail === "") {
      alert("이메일을 입력해주세요.");
    } else if (join.password === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (join.re_password === "") {
      alert("확인 비밀번호를 입력해주세요.");
    } else if (join.userGender === 0) {
      alert("성별을 체크해주세요.");
    } else if (window.confirm("입력하신 정보로 정말 가입하시겠습니까?")) {
      await fetch("http://localhost:8080/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: join.userId,
          userPassword: join.password,
          userEmail: join.email,
          userGender: join.gender,
          userBirth: join.birth,
          userName: join.username,
        }),
      }).then((res) => {
        if (res?.ok) {
          alert("가입완료! 로그인을 진행해주세요.");
          loginClick();
        }
      });
    }
  };
  return (
    <div className="joinItem">
      <div className="joinBody">
        <label>이름</label>
        <input
          placeholder="ex)홍길동"
          name="username"
          onChange={onItemChange}
        />

        <label>생년월일</label>
        <input placeholder="ex)19960826" name="birth" onChange={onItemChange} />

        <label>성별</label>
        <select className="selectSex" onChange={onSelect}>
          <option value="0">성별</option>
          <option value="1">남성</option>
          <option value="2">여성</option>
        </select>

        <label>아이디</label>
        <input placeholder="아이디" name="userId" onChange={onItemChange} />

        <label>비밀번호</label>
        <input placeholder="비밀번호" name="password" onChange={onItemChange} />

        <label>비밀번호 확인</label>
        <input
          placeholder="비밀번호 확인"
          name="re_password"
          onChange={onItemChange}
        />

        <label>이메일주소</label>
        <input
          placeholder="이메일 주소를 입력해 주세요"
          name="email"
          onChange={onItemChange}
        />

        <div className="btnForm">
          <button className="btnJoin" onClick={joinSubmit}>
            회원가입 &#x2713;
          </button>
          <button className="btnCancel" onClick={deleteClick}>
            가입취소 &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
