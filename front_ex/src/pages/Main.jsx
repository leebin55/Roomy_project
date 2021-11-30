import React from "react";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
import ProfileBox from "../components/ProfileBox";
import Popular from "../components/Popular";
import "../css/Main.css";

function Main() {
  return (
    <div>
      <header>
        <img className="logo" src="img/cyworld.jpg" />
      </header>
      <MainNav />
      <div className="main-container">
        <section className="section-left">
          <ProfileBox />
        </section>
        <section className="section-middle">
          <Outlet />
        </section>
        <section className="section-right">
          <Popular />
        </section>
      </div>
    </div>
  );
}

export default Main;
