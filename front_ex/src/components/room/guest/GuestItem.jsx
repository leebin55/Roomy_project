import React from "react";

function GuestItem({ data }) {
  const guestDelete = () => {};

  return (
    <div className="guest_item_box">
      <section className="guest_head">
        <p>
          <span>NO.</span>
          {data.guest_seq}
        </p>
        <p>{data.guest_writer_name}</p>
        <p>&#127968;</p>
        <p>{data.guest_create_at}</p>
        <p className="guest_list_private">비밀글로 전환</p>
        <p className="guest_list_update">수정</p>
        <p className="guest_list_delete" onClick={guestDelete}>
          삭제
        </p>
      </section>
      <section className="guest_body">
        <div className="guest_img"></div>
        <div className="guest_content">{data.guest_content}</div>
      </section>
    </div>
  );
}

export default GuestItem;
