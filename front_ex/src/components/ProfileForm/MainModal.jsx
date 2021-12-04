import React, { useState } from "react";
import "../../css/loginForm/MainModal.css";
import LoginModal from "./ModalItem/LoginModal";
import JoinModal from "./ModalItem/JoinModal";
import FindModal from "./ModalItem/FindModal";

import { useLoginContext } from "../../context/LoginContextProvider";

function MainModal() {
  const { login, join, find, loginClick, joinClick, findClick } =
    useLoginContext();

  return (
    <div className="mainContainer">
      {login && (
        <>
          <div className="modalHeader">
            <div className="loginTitle item">
              <div onClick={loginClick}>로그인</div>
            </div>
            <div className="item">
              <div onClick={joinClick}>회원가입</div>
            </div>
            <div className="item">
              <div onClick={findClick}>아이디/비밀번호찾기</div>
            </div>
          </div>
          <LoginModal />
        </>
      )}
      {join && (
        <>
          <div className="modalHeader">
            <div className="item">
              <div onClick={loginClick}>로그인</div>
            </div>
            <div className="joinTitle item">
              <div onClick={joinClick}>회원가입</div>
            </div>
            <div className="item">
              <div onClick={findClick}>아이디/비밀번호찾기</div>
            </div>
          </div>
          <JoinModal />
        </>
      )}
      {find && (
        <>
          <div className="modalHeader">
            <div className="item">
              <div onClick={loginClick}>로그인</div>
            </div>
            <div className="item">
              <div onClick={joinClick}>회원가입</div>
            </div>
            <div className="findTitle item">
              <div onClick={findClick}>아이디/비밀번호찾기</div>
            </div>
          </div>
          <FindModal />
        </>
      )}
    </div>
  );
}

export default MainModal;
