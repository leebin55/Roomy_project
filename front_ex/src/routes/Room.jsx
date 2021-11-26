import React from "react";
import { Outlet } from "react-router-dom";
import { LeftSide } from "../components/room/RoomComps";
import RoomNav from "../components/room/RoomNav";
import "../css/Room.css";

function Room() {
  return (
    <div className="room-main-container">
      <section className="room-left-side">
        <LeftSide />
      </section>
      <section className="room-right-side">
        <Outlet />
      </section>
      <section className="room-main-nav">
        <RoomNav />
      </section>
    </div>
  );
}

export default Room;
