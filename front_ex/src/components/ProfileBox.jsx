import "../css/ProfileBox.css";
import { useState } from "react";

function ProfileBox() {
  const pStyle = {
    fontSize: "30px",
  };

  const [login, setLogin] = useState(false);

  const loginClicked = () => {
    setLogin(true);
  };
  return (
    <div>
      {login ? (
        <div className="profile-box-after">
          <img className="profile-img" src="img/logo.svg" />
          <p style={pStyle}>김이름</p>
          <div className="profile-p">
            <p>쪽지함 1</p>
            <p>친구요청 10</p>
          </div>
          <div className="profile-btn">
            <button>수정</button>
            <button>로그아웃</button>
          </div>
          <button className="btn-mini">내 미니홈피 가기</button>
        </div>
      ) : (
        <div className="profile-box-before">
          <img className="profile-img" src="img/logo.svg" />
          <div className="profile-btn">
            <button onClick={loginClicked}>로그인</button>
            <button>회원가입</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileBox;
