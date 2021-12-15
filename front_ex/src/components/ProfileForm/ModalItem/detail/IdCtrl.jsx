import React from "react";

function IdCtrl() {
  return (
    <div className="findItem">
      <h1>아이디 찾기</h1>
      <input placeholder="이름을 입력해주세요." />
      <input placeholder="생년월일을 입력해주세요." />
      <button>찾기</button>
      <div className="result">ID : 'blosw123' 입니다.</div>
    </div>
  );
}

export default IdCtrl;
