import React from "react";
import { NavLink } from "react-router-dom";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function RoomNav({ userId }) {
  return (
    <nav>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId}
      >
        HOME
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/board"}
      >
        게시판
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/gallery"}
      >
        사진첩
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/todo"}
      >
        할 일
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/guest"}
      >
        방명록
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/friendlist"}
      >
        친구관리
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          "room-nav-box" + (isActive ? " room-nav-click" : "")
        }
        exact
        to={"/room/" + userId + "/setting"}
      >
        설정
      </NavLink>

      <NavLink className="room-nav-box" to="/">
        <CancelPresentationIcon />
      </NavLink>
    </nav>
  );
}
export default RoomNav;
