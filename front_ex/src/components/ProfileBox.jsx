import "../css/userForm/ProfileBox.css";
import { NavLink } from "react-router-dom";
import MainModal from "./ProfileForm/MainModal";
import { useLoginContext } from "../context/LoginContextProvider";

function ProfileBox() {
  const { loginClick, findClick, joinClick, login, join, find } =
    useLoginContext();

  return (
    <div>
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
