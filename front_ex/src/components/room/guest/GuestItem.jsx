import React from "react";

function GuestItem() {
  //   const fetchGuest = async () => {
  //     const res = await fetch("http://localhost:8080/room/guest");
  //     const result = await res.json();
  //     await setContent(result);
  //   };
  return (
    <div className="guest_box">
      <section className="guest_head">
        <p>
          <span>NO.1</span>
        </p>
        <p>최서녕</p>
        <p>집</p>
        <p>2021.12.01</p>
        <p>비밀글로 전환</p>
        <p>수정</p>
        <p>삭제</p>
      </section>
      <section className="guest_body">
        <div className="guest_img"></div>
        <div className="guest_content" />
      </section>
    </div>
  );
}

export default GuestItem;
