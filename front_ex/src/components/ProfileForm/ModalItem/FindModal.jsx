import React, { useState } from "react";
import { useLoginContext } from "../../../context/LoginContextProvider";
import "../../../css/userForm/FindModal.css";
import IdCtrl from "./detail/IdCtrl";
import PwCtrl from "./detail/PwCtrl";

function FindModal() {
  const { loginClick, joinClick, findClick } = useLoginContext();
  const [idCtrl, setIdCtrl] = useState(false);
  const [pwCtrl, setPwCtrl] = useState(false);
  const [mainCtrl, setMainCtrl] = useState(true);
  const ctrlId = () => {
    setIdCtrl(true);
    setPwCtrl(false);
    setMainCtrl(false);
  };
  const ctrlPw = () => {
    setPwCtrl(true);
    setIdCtrl(false);
    setMainCtrl(false);
  };

  return (
    <>
      <div className="findContainer">
        {mainCtrl && (
          <>
            <div className="findById">
              <button onClick={ctrlId}>아이디 찾기</button>
            </div>
            <div className="findByPw">
              <button onClick={ctrlPw}>비밀번호 찾기</button>
            </div>
          </>
        )}
        {idCtrl && (
          <>
            <div className="findById">
              <IdCtrl />
            </div>
            <div className="findByPw">
              <button onClick={ctrlPw}>비밀번호 찾기</button>
            </div>
          </>
        )}

        {pwCtrl && (
          <>
            <div className="findById">
              <button onClick={ctrlId}>아이디 찾기</button>
            </div>
            <div className="findByPw">
              <PwCtrl />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default FindModal;
