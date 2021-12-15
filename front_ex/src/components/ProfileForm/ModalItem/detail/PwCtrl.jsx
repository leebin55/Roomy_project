import React from "react";

function PwCtrl() {
  return (
    <div className="findItem">
      <h1>비밀번호 찾기</h1>
      <input placeholder="이름을 입력해주세요." />
      <input placeholder="아이디를 입력해주세요." />
      <button>찾기</button>
      <div className="result">PW : 'test123' 입니다.</div>
    </div>
  );
}

export default PwCtrl;
