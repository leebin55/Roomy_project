import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { LeftSide } from '../components/room/RoomComps';
import axiosInstance from '../utils/AxiosInstance';
import RoomNav from '../components/room/RoomNav';
import '../css/Room.css';

function Room() {
  // 현재 접속해있는 미니홈피 주인회원id URL에서 잘라오기
  const { userId } = useParams();
  const [roomData, setRoomData] = useState({});
  const [userInfo, setUserInfo] = useState('');
  const [checkFollow, setCheckFollow] = useState(false);
  // 맨위 follow버튼 보이기 (기본값 true) > 로그인한 user와 room 주인이 같을때만 false
  const [showFollowBtn, setShowFollowBtn] = useState(true);

  //------------------------------------------------------------------
  // axios 여러개 한번에 받아오기
  // 유저 프로필 불러오기
  const getUserProfile = () => axiosInstance.get(`/user/${userId}`);

  // 미니홈피 정보들 불러오기
  const getRoomInfo = () => axiosInstance.get(`/room/${userId}`);

  // Follow / Unfollow => 로그인한 아이디가 room의 주인이 아닐때 follow 했는지 안했는지 확인
  // server의 session 에서 로그인한 아이디 확인
  const checkFollowInfo = () =>
    axiosInstance.get(`/friend/${userId}/checkfollow`);

  useEffect(() => {
    // multiple concurrent requests
    Promise.all([getUserProfile(), getRoomInfo(), checkFollowInfo()]).then(
      (res) => {
        // 변수에 넣으면 먼저 실행되는게 아니라서 setRoomData 에 값이 안들어감
        //   const userInfo = res[0].data;
        //   const roomInfo = res[1].data;
        setUserInfo(res[0].data);
        setRoomData(res[1].data);
        console.log(res[2].data);
        // 로그인한 유저와 room주인의 아이디가 다를때
        if (res[2].data.sameUser) {
          //
          setShowFollowBtn(false);
          return;
        }
        setCheckFollow(res[2].data.checkFollow); // follow 했는지 확인 true: follow 한상태
      }
    );
  }, []);
  //-----------------------------------------------------------------

  const buttonClick = () => {
    if (checkFollow) {
      // true일때 > follow한 상태일때
      setCheckFollow(false);
      // Unfollow 실행 > table에서 delete
      axiosInstance.delete(`/friend/unfollow`, {
        data: {
          // userId: 'testId', // 로그인한 유저
          followUserId: userId, // 미니홈피 주인
        },
      });
      return;
    }
    setCheckFollow(true);
    // follow 실행
    axiosInstance.post(`/friend/follow`, {
      //  userId: 'testId', // 로그인한 유저
      followUserId: userId, // 미니홈피 주인
    });
  };
  return (
    <div className="room-background">
      <div className="room-main-container">
        <div className="room-left-1">
          <p className="room-visit">
            today<span>0</span>total<span>{roomData.roomTotal}</span>
          </p>
          <div className="room-left-2">
            <section className="room-left-side">
              <LeftSide roomData={roomData} userInfo={userInfo} />
            </section>
          </div>
        </div>
        <div className="room-right-1">
          <div className="room-right-header">
            <p className="room-name">{roomData.roomName}</p>
            {showFollowBtn && (
              <>
                {checkFollow ? (
                  <button onClick={buttonClick}>✖ UNFOLLOW</button>
                ) : (
                  <button onClick={buttonClick}>➕ FOLLOW </button>
                )}
              </>
            )}
          </div>
          <div className="room-right-2">
            <section className="room-right-side">
              <Outlet />
            </section>
            <section className="room-main-nav">
              <RoomNav userId={userId} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
