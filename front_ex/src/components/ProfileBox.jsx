import { useState, useEffect } from 'react';
import '../css/userForm/ProfileBox.css';
import { useNavigate } from 'react-router-dom';
import MainModal from './ProfileForm/MainModal';
import { useLoginContext } from '../context/LoginContextProvider';
import '../css/userForm/Logout.css';
import ProfileUpdateModal from './ProfileForm/ProfileUpdateModal';

function ProfileBox() {
  //const [set, setSet] = useState();
  const [openUpdate, setOpenUpdate] = useState(false); // 수정할때 관련 모달창
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
    removeCookie,
    cookie,
    userProfile,
    setUserProfile,
  } = useLoginContext();

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      fetch('http://localhost:8080/user/logout').then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTemp(false);
          // 애플리케이션 안에 쿠키 안에 user를 삭제해라 path는 그냥 전송범위임 루트로 해놨음
          setUserProfile('');
          removeCookie('user', { path: '/' });
        }
      });
    }
  };

  const navigate = useNavigate();

  const goMini = () => {
    const id = cookie.user.userId;
    navigate(`/room/${id}`);
  };

  useEffect(() => {
    // user라고 만들어진 쿠키가 있으면
    if (cookie.user) {
      // temp는 view 용도로 만들어진거임
      setTemp(true);
    } else {
      //user라고 만들어진 쿠키에 값이 없으면 temp false
      setTemp(false);
    }
  }, []);

  // 회원정보 수정하기 버튼 클릭 이벤트
  const info_update = () => {
    setOpenUpdate(true);
  };
  return (
    <div>
      {/* temp가 트루면 즉 user라는 쿠키가 있으면  */}
      {temp === true ? (
        <div className="afterContainer">
          <div className="logoutHeader">
            {!userProfile ? (
              <>
                {' '}
                <img className="logo" src="img/logo.svg" alt="profile_img" />
              </>
            ) : (
              <>
                {' '}
                <img className="logo" src={userProfile} alt="profile_img" />
              </>
            )}
            {/* cookie.user가 있으면 user라는 이름의 쿠키에 userName을 출력해라 */}
            {cookie.user && <p>{cookie.user.userName}님</p>}
          </div>
          <div className="logoutBody">
            <div>쪽지함 </div>
            <div>팔로우 2.4k</div>
          </div>
          <div className="logoutFooter">
            <div className="footerDetail">
              <button onClick={info_update}>수정하기</button>
              <button onClick={logout}> 로그아웃</button>
            </div>
            <button id="mini" onClick={goMini}>
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
            <button onClick={loginClick}>CYWORLD 로그인</button>
          </div>
          <div className="loginFooter">
            <button onClick={findClick}>아이디/비밀번호 찾기</button>
            <button onClick={joinClick}>회원가입</button>
          </div>
        </div>
      )}

      {openUpdate && (
        <>
          <ProfileUpdateModal
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            loggedUser={cookie.user.userId}
          />
        </>
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
