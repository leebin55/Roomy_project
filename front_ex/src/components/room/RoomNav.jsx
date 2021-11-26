import React from "react";
import { NavLink } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function RoomNav() {
  return (
    <nav className="room-main-nav">
      <NavLink to="/room">Home</NavLink>
      <NavLink to="/room/board">Board</NavLink>
      <NavLink to="/room/gallery">Gallery</NavLink>
      <NavLink to="/room/todo">Todo</NavLink>
      <NavLink to="/room/setting">Setting</NavLink>
      <NavLink to="/">
        <CancelPresentationIcon />
      </NavLink>
    </nav>
  );
}
export default RoomNav;
