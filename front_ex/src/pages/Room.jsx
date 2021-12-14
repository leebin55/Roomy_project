import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSide } from "../components/room/RoomComps";
import RoomNav from "../components/room/RoomNav";
import "../css/Room.css";
import SettingContextProvider from "../context/SettingContextProvider";

function Room() {
  return (
    <div className="room-background">
      <div className="room-main-container">
        <div className="room-left-1">
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
