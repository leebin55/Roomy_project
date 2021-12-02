import React, { useState } from "react";

function GuestItem({ data, fetchList, content }) {
  const [guest_update, setGuest_update] = useState(false);

  const guestDelete = async () => {
    if (window.confirm("방명록을 삭제하시겠습니까?")) {
      //   alert(data.guest_seq);
      await fetch(`http://localhost:8080/room/guest/${data.guest_seq}`, {
        method: "DELETE",
      }).then((res) => {
        if (res?.ok) {
          alert("삭제되었습니다");
          fetchList();
        }
      });
    }
  };

  const guestUpdate = async () => {
    setGuest_update(!guest_update);
    if (content === "") {
      alert("방명록을 입력하세요");
      return;
    }
    await fetch("http://localhost:8080/room/guest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_content: content,
      }),
    });
  };

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
        <p className="guest_list_private">
          {data.guest_private ? "공개글로 전환" : "비밀글로 전환"}
        </p>
        <p className="guest_list_update" onClick={guestUpdate}>
          {guest_update ? "등록" : "수정"}
        </p>
        <p className="guest_list_delete" onClick={guestDelete}>
          삭제
        </p>
      </section>
      <section className="guest_body">
        <div className="guest_img"></div>
        <div className="guest_content">
          {guest_update ? (
            <textarea
              className="guest_update_content"
              defaultValue={data.guest_content}
            ></textarea>
          ) : (
            <>
              {data.guest_private ? "🔒 " : ""}
              {data.guest_content}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default GuestItem;
