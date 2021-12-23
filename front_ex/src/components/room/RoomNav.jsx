import React from 'react';
import { NavLink } from 'react-router-dom';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

function RoomNav({ userId }) {
  return (
    <nav className="room-main-nav">
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/board'}
      >
        Board
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/gallery'}
      >
        Gallery
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/todo'}
      >
        Todo
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/guest'}
      >
        Guest
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/friendlist'}
      >
        Friend
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          'room-nav-box' + (isActive ? ' room-nav-click' : '')
        }
        to={'/room/' + userId + '/setting'}
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
