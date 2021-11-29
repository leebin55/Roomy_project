import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSide } from "../components/room/RoomComps";
import RoomNav from "../components/room/RoomNav";
import "../css/Room.css";

function Room() {
  return (
    <div className="room-background">
      <div className="room-main-container">
        <div className="room-left-1">
          <div className="room-left-2">
            <section className="room-left-side">
              <LeftSide />
            </section>
          </div>
        </div>
        <div className="room-right-1">
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
