import React, { useState } from "react";
import "../../../css/userForm/FindModal.css";
import IdCtrl from "./detail/IdCtrl";
import PwCtrl from "./detail/PwCtrl";

function FindModal() {
  const [findCtrl, setFindCtrl] = useState({
    idCtrl: false,
    pwCtrl: false,
    mainCtrl: true,
  });
  const ctrlId = () => {
    setFindCtrl({ idCtrl: true, pwCtrl: false, mainCtrl: false });
  };
  const ctrlPw = () => {
    setFindCtrl({ idCtrl: false, pwCtrl: true, mainCtrl: false });
  };
  const find = () => {
    return (
      <>
        <div className="findById">
          {findCtrl.idCtrl === true ? (
            <IdCtrl />
          ) : (
            <button onClick={ctrlId}>아이디 찾기</button>
          )}
        </div>
        <div className="findByPw">
          {findCtrl.pwCtrl === true ? (
            <PwCtrl />
          ) : (
            <button onClick={ctrlPw}>비밀번호 찾기</button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="findContainer">
        {findCtrl.mainCtrl && find()}
        {findCtrl.idCtrl && find()}
        {findCtrl.pwCtrl && find()}
      </div>
    </>
  );
}

export default FindModal;
