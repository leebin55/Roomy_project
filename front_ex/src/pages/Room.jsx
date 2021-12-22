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

  //////////////////////////////////////////////////////////////////////
  // axios 여러개 한번에 받아오기
  // 유저 프로필 불러오기
  const getUserProfile = () => axiosInstance.get(`/user/${userId}`);

  // 미니홈피 정보들 불러오기
  const getRoomInfo = () => axiosInstance.get(`/room/${userId}`);

  useEffect(() => {
    // multiple concurrent requests
    Promise.all([getUserProfile(), getRoomInfo()]).then((res) => {
      // 변수에 넣으면 먼저 실행되는게 아니라서 setRoomData 에 값이 안들어감
      //   const userInfo = res[0].data;
      //   const roomInfo = res[1].data;
      //console.log(userInfo, roomInfo);
      setRoomData(res[1].data);
      setUserInfo(res[0].data);
      console.log(res[0].data.userProfile);
    });
  }, []);
  ////////////////////////////////////////////////////////////////////////

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
          <p className="room-name">{roomData.roomName}</p>
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
