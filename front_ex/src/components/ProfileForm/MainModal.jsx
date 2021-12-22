import React, { useState } from "react";
import "../../css/userForm/MainModal.css";
import LoginModal from "./ModalItem/LoginModal";
import JoinModal from "./ModalItem/JoinModal";
import FindModal from "./ModalItem/FindModal";

import { useLoginContext } from "../../context/LoginContextProvider";

function MainModal() {
  const { modal, loginClick, joinClick, findClick, deleteClick } =
    useLoginContext();

  const onModal = () => {
    return (
      <div className="modalHeader">
        <div className={`item ${modal.login && "loginTitle item"}`}>
          <div onClick={loginClick}>로그인</div>
        </div>
        <div className={`item ${modal.join && "joinTitle item"}`}>
          <div onClick={joinClick}>회원가입</div>
        </div>
        <div className={`item ${modal.find && "findTitle item"}`}>
          <div onClick={findClick}>아이디/비밀번호찾기</div>
        </div>
        <div className="btnDelete">
          <button onClick={deleteClick}>X</button>
        </div>
      </div>
    );
  };

  return (
    <div className="modalContainer">
      {modal.login && (
        <>
          {onModal()}
          <LoginModal />
        </>
      )}
      {modal.join && (
        <>
          {onModal()}
          <JoinModal />
        </>
      )}
      {modal.find && (
        <>
          {onModal()}
          <FindModal />
        </>
      )}
    </div>
  );
}

export default MainModal;
