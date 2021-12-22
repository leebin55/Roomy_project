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

  // 미니홈피 정보들 불러오기
  const getUserProfile = () => axiosInstance.get(`/room/${userId}`);

  const getRoomInfo = () => axiosInstance.get(`/room/${userId}`);

  const getRoomInfoAndUserProfile = async () => {
    axiosInstance.get().then((res) => {
      console.log(res.data);
      setRoomData(res.data);
    });
  };

  useEffect(() => {
    getRoomInfoAndUserProfile();
  }, []);

  return (
    <div className="room-background">
      <div className="room-main-container">
        <div className="room-left-1">
          <p className="room-visit">
            today<span>0</span>total<span>{roomData.roomTotal}</span>
          </p>
          <div className="room-left-2">
            <section className="room-left-side">
              <LeftSide roomData={roomData} />
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
