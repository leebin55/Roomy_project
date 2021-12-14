import { useState } from "react";
import "../css/userForm/ProfileBox.css";
import { NavLink, useNavigate } from "react-router-dom";
import MainModal from "./ProfileForm/MainModal";
import { useLoginContext } from "../context/LoginContextProvider";
import "../css/userForm/Logout.css";

function ProfileBox() {
  const {
    loginClick,
    findClick,
    joinClick,
    login,
    join,
    find,
    user,
    setUser,
    setTemp,
    temp,
  } = useLoginContext();
  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      fetch("http://localhost:8080/room/logout").then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTemp(false);
        }
      });
    }
  };
  const navigate = useNavigate();
  const goMini = () => {
    navigate("/room");
  };

  return (
    <div>
      {temp === true ? (
        <div className="afterContainer">
          <div className="logoutHeader">
            <p>{user.userId}님 반갑습니다.</p>
          </div>
          <div className="logoutBody">
            <button onClick={logout}>CYWORLD 로그아웃</button>
          </div>
          <div className="logoutFooter">
            <button onClick={goMini}>미니홈피가기</button>
            <p>친구</p>
            <p>친구2</p>
            <p>친구3안나옴</p>
            <p>니가가라하와이</p>
          </div>
        </div>
      ) : (
        <div className="beforeContainer">
          <div className="loginHeader">
            <p>도움이 필요하세요?</p>
          </div>
          <div className="loginBody">
            <button onClick={loginClick}>CYWORLD 로그인</button>
          </div>
          <div className="loginFooter">
            <button onClick={findClick}>아이디/비밀번호 찾기</button>
            <button onClick={joinClick}>회원가입</button>
          </div>
        </div>
      )}

      {login && (
        <div>
          <MainModal />
        </div>
      )}
      {join && (
        <>
          <MainModal />
        </>
      )}
      {find && (
        <>
          <MainModal />
        </>
      )}
    </div>
  );
}
export default ProfileBox;
