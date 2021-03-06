import React from "react";
import { NavLink } from "react-router-dom";
import "../css/MainNav.css";

function MainNav() {
  return (
    <nav className="main-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/search">미니홈피 찾기</NavLink>
      {/* <NavLink to="/game">Game</NavLink>
      <NavLink to="/news">News</NavLink> */}
    </nav>
  );
}

export default MainNav;
