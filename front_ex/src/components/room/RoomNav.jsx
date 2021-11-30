import React from "react";
import { NavLink } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function RoomNav() {
  return (
    <nav className="room-main-nav">
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room/board"
      >
        Board
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room/gallery"
      >
        Gallery
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room/todo"
      >
        Todo
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room/guest"
      >
        Guest
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        to="/room/setting"
      >
        Setting
      </NavLink>
      <NavLink className="room-nav-box" to="/">
        <CancelPresentationIcon />
      </NavLink>
    </nav>
  );
}
export default RoomNav;
