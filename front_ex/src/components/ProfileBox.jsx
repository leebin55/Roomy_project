import { useState, useEffect } from "react";
import "../css/userForm/ProfileBox.css";
import { useNavigate } from "react-router-dom";
import MainModal from "./ProfileForm/MainModal";
import { useLoginContext } from "../context/LoginContextProvider";
import "../css/userForm/Logout.css";
import ProfileUpdateModal from "./ProfileForm/ProfileUpdateModal";

function ProfileBox() {
  const navigate = useNavigate();
  const [openUpdate, setOpenUpdate] = useState(false); // 수정할때 관련 모달창
  // 서버에서 온 session 에 담긴 유저 정보들
  const [user, setUser] = useState({ userId: null, userName: null });
  const {
    modal,
    loginClick,
    findClick,
    joinClick,
    setCheck_login,
    check_login,
    userProfile,
    setUserProfile,
  } = useLoginContext();

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      fetch("http://localhost:8080/user/logout", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          setCheck_login(false);
          setUserProfile("");
          setUser({ userId: null, userName: null });
        }
      });
    }
  };

  // 내 미니홈피 가기 버튼 클릭하면 실행
  const goMini = () => {
    const id = user.userId;
    navigate(`/room/${id}`);
  };

  // 현재 로그인된 user 정보 가져오기 (이름, 미니홈피가기 url 등)
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:8080/user/login-ok`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
    });
    const data = await res.json();
    if (data) {
      setCheck_login(true);
      setUser({ userId: data.userId, userName: data.userName });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [check_login]);

  // 회원정보 수정하기 버튼 클릭 이벤트
  const info_update = () => {
    setOpenUpdate(true);
  };

  return (
    <>
      {check_login ? (
        <div className="afterContainer">
          <div className="logoutHeader">
            {!userProfile ? (
              <>
                {" "}
                <img className="logo" src="img/logo.svg" alt="profile_img" />
              </>
            ) : (
              <>
                {" "}
                <img className="logo" src={userProfile} alt="profile_img" />
              </>
            )}
            {/* user가 있으면 userName을 출력 */}
            {user && <p>{user.userName}님</p>}
          </div>
          <div className="logoutBody">
            <div>쪽지함 </div>
            <div>팔로우 2.4k</div>
          </div>
          <div className="logoutFooter">
            <div className="footerDetail">
              <button onClick={() => info_update()}>수정하기</button>
              <button onClick={() => logout()}> 로그아웃</button>
            </div>
            <button id="mini" onClick={() => goMini()}>
              미니홈피가기
            </button>
          </div>
        </div>
      ) : (
        <div className="beforeContainer">
          <div className="loginHeader">
            <p>도움이 필요하세요?</p>
          </div>
          <div className="loginBody">
            <button onClick={() => loginClick()}>CYWORLD 로그인</button>
          </div>
          <div className="loginFooter">
            <button onClick={() => findClick()}>아이디/비밀번호 찾기</button>
            <button onClick={() => joinClick()}>회원가입</button>
          </div>
        </div>
      )}

      {openUpdate && (
        <>
          <ProfileUpdateModal
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            loggedUser={user.userId}
          />
        </>
      )}
      {modal.login && (
        <div>
          <MainModal />
        </div>
      )}
      {modal.join && (
        <>
          <MainModal />
        </>
      )}
      {modal.find && (
        <>
          <MainModal />
        </>
      )}
    </>
  );
}
export default ProfileBox;
