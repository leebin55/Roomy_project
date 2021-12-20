import axios from "axios";
import React, { useState } from "react";

function PwCtrl() {
  const [success, setSuccess] = useState(false);
  const [findData, setFindData] = useState();
  const [updatePw, setUpdatePw] = useState("");

  const [findPw, setFindPw] = useState({
    userName: "",
    userId: "",
  });
  const onIdAndName = (e) => {
    setFindPw({
      ...findPw,
      [e.target.name]: e.target.value,
    });
  };
  const onUpdatePw = (e) => {
    setUpdatePw(e.target.value);
  };
  const findByPwSubmit = async () => {
    const response = await fetch(
      `http://localhost:8080/user/username/${findPw.userName}/userid/${findPw.userId}`
    );
    if (response?.ok) {
      const result = await response.json();
      alert("인증 성공 비밀번호를 변경해주세요.");
      console.log(result);
      setSuccess(true);
      setFindData(result);
      console.log(findData);
    } else {
      alert("인증 실패");
      setSuccess(false);
    }
  };

  const updateSubmit = () => {
    axios
      .put("http://localhost:8080/user/userpassword", {
        userId: findData.userId,
        password: updatePw,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="findItem">
      <h1>비밀번호 찾기</h1>
      <input
        name="userName"
        onChange={onIdAndName}
        placeholder="이름을 입력해주세요."
      />
      <input
        name="userId"
        onChange={onIdAndName}
        placeholder="아이디를 입력해주세요."
      />
      <button onClick={findByPwSubmit}>찾기</button>
      {success === true ? (
        <div className="successPw">
          <h2>인증성공</h2>
          <input
            onChange={onUpdatePw}
            placeholder="변경할 비밀번호를 입력해주세요."
          />
          <button onClick={updateSubmit}>비밀번호 저장</button>
        </div>
      ) : (
        <div>
          <h1>...</h1>
        </div>
      )}
    </div>
  );
}

export default PwCtrl;
