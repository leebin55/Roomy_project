import React from "react";

function RoomMain() {
  return (
    <>
      <section className="main-top">
        <div className="main-recent-box"></div>
        <div className="main-list-box"></div>
      </section>
      <section className="main-bottom">
        <div className="main-guest-box">
          <img src="/img/postit.png" />
          <p>방가방가</p>
        </div>
        <div className="main-guest-box">
          <img src="/img/postit.png" />
          <p>하이하이</p>
        </div>
        <div className="main-guest-box">
          <img src="/img/postit.png" />
          <p>하이하이</p>
        </div>
        <div className="main-guest-box">
          <img src="/img/postit.png" />
          <p>하이하이</p>
        </div>
      </section>
    </>
  );
}

export default RoomMain;
