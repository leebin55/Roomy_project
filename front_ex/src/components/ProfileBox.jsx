import { useState, useEffect } from 'react';
import '../css/userForm/ProfileBox.css';
import { useNavigate } from 'react-router-dom';
import MainModal from './ProfileForm/MainModal';
import { useLoginContext } from '../context/LoginContextProvider';
import '../css/userForm/Logout.css';
import ProfileUpdateModal from './ProfileForm/ProfileUpdateModal';

function ProfileBox() {
  const [set, setSet] = useState();
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
  } = useLoginContext();

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      fetch('http://localhost:8080/room/logout').then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTemp(false);

          window.localStorage.removeItem('user');
        }
      });
    }
  };

  const navigate = useNavigate();

  let localUser = window.localStorage.getItem('user');

  const goMini = () => {
    if (localUser) {
      const userId = JSON.parse(localUser).userId;
      navigate(`/room/${userId}`);
    }
  };

  useEffect(() => {
    if (localUser) {
      console.log('localUser', localUser);
      const obj = JSON.parse(localUser);
      console.log('id:', obj.userId);
      console.log('pw:', obj.password);
      // console.log("id:", JSON.parse(localUser.userId));

      fetch('http://localhost:8080/room/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: obj.userId,
          password: obj.password,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTemp(true);
          setUser({
            userId: obj.userId,
          });
        } else {
          setTemp(false);
        }
      });
    }
  }, []);

  // 회원정보 수정하기 버튼 클릭 이벤트
  const info_update = () => {
    setOpenUpdate(true);
  };
  return (
    <div>
      {temp === true ? (
        <div className="afterContainer">
          <div className="logoutHeader">
            <img className="logo" src="img/logo.svg" alt="profile_img" />
            <p>{user.userId}님</p>
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
