import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { LeftSide } from "../components/room/RoomComps";
import RoomNav from "../components/room/RoomNav";
import "../css/Room.css";
import SettingContextProvider from "../context/SettingContextProvider";

function Room() {
  // 현재 접속해있는 미니홈피 주인회원id URL에서 잘라오기
  const { userId } = useParams();

  // 미니홈피 정보들 불러오기 (미완)
  const fetchRoom = async () => {
    const res = await fetch(`http://localhost:8080/room/${userId}`);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div className="room-background">
      <div className="room-main-container">
        <div className="room-left-1">
          <p className="room-visit">
            today<span>0</span>total<span>0</span>
          </p>
          <div className="room-left-2">
            <section className="room-left-side">
              <SettingContextProvider>
                <LeftSide />
              </SettingContextProvider>
            </section>
          </div>
        </div>
        <div className="room-right-1">
          <p className="room-name">우당탕 님의 미니홈피 입니다.</p>
          <div className="room-right-2">
            <section className="room-right-side">
              <Outlet />
            </section>
            <section className="room-main-nav">
              <RoomNav />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
