import React from "react";
import { useLoginContext } from "../../../context/LoginContextProvider";
import "../../../css/userForm/JoinModal.css";

function JoinModal() {
  return (
    <div className="joinItem">
      <div className="joinBody">
        <label>이름</label>
        <input placeholder="ex)홍길동" />

        <label>생년월일</label>
        <input placeholder="ex)19960826" />

        <label>성별</label>
        <select className="selectSex">
          <option>남성</option>
          <option>여성</option>
        </select>

        <label>아이디</label>
        <input placeholder="아이디" />

        <label>비밀번호</label>
        <input placeholder="비밀번호" />

        <label>비밀번호 확인</label>
        <input placeholder="비밀번호 확인" />

        <label>이메일주소</label>
        <input placeholder="이메일 주소를 입력해 주세요" />

        <label>전화번호</label>
        <input placeholder="전화번호를 입력해 주세요." />

        <div className="btnForm">
          <button className="btnJoin">회원가입 &#x2713;</button>
          <button className="btnCancel">가입취소 &times;</button>
        </div>
      </div>
    </div>
  );
}

export default JoinModal;
