import React, { useState } from "react";
import axios from "axios";

function IdCtrl() {
  const [findId, setFindId] = useState("");
  const [findUser, setFindUser] = useState({
    userName: "",
    userBirth: "",
  });
  const onFindChange = (e) => {
    setFindUser({
      ...findUser,
      [e.target.name]: e.target.value,
    });
    // console.log(findUser);
  };
  const findByIdSubmit = async () => {
    if (findUser.userName === "") {
      alert("이름을 입력해주세요.");
      return false;
    } else if (findUser.userBirth === "") {
      alert("생년월일을 입력해주세요.");
      return false;
    }
    await axios
      .get(
        `http://localhost:8080/user/username/${findUser.userName}/birth/${findUser.userBirth}`
      )
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          setFindId(res.data);
          alert("인증성공 아이디를 찾았습니다.");
          //   console.log(res);
        }
      });
  };

  return (
    <div className="findItem">
      <h1>아이디 찾기</h1>
      <input
        name="userName"
        onChange={onFindChange}
        placeholder="이름을 입력해주세요."
      />
      <input
        name="userBirth"
        onChange={onFindChange}
        placeholder="생년월일을 입력해주세요."
      />
      <button onClick={findByIdSubmit}>찾기</button>
      {findId.userId !== null && (
        <div className="result">ID : {findId.userId} 입니다.</div>
      )}
    </div>
  );
}

export default IdCtrl;
