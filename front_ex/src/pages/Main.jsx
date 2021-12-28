import React from "react";
import MainNav from "../components/MainNav";
import { Outlet } from "react-router-dom";
import ProfileBox from "../components/ProfileBox";
import Popular from "../components/Popular";
import "../css/Main.css";
import LoginContextProvider from "../context/LoginContextProvider";

function Main() {
  return (
    <div>
      <header>
        <img className="logo" src="img/logo1.png" />
      </header>
      <MainNav />
      <div className="main-container">
        <section className="section-left">
          <LoginContextProvider>
            <ProfileBox />
          </LoginContextProvider>
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
