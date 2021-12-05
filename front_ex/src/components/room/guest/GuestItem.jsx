import React, { useState } from "react";

function GuestItem({ data, fetchList }) {
  const [updating, setUpdating] = useState(false);
  const [update_content, setUpdate_content] = useState();

  const onChange = (e) => {
    setUpdate_content(e.target.value);
  };

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

  const clickUpdate = () => {
    if (updating) {
      if (update_content === "") {
        alert("방명록을 입력하세요");
        return;
      } else if (update_content == data.guest_content) {
        alert("변경된 내용이 없습니다");
        return;
      }
      guestUpdate();
    }
    setUpdating(!updating);
  };

  const guestUpdate = async () => {
    await fetch(`http://localhost:8080/room/guest/${data.guest_seq}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_content: update_content,
      }),
    }).then((res) => {
      if (res?.ok) {
        alert("수정되었습니다");
        fetchList();
      }
    });
    setUpdate_content("");
    fetchList();
  };

  return (
    <div className="guest-item-box">
      <section className="guest-head">
        <p>
          <span>NO.</span>
          {data.guest_seq}
        </p>
        <p>{data.guest_writer_name}</p>
        <p>&#127968;</p>
        <p>{data.guest_create_at}</p>
        <p className="guest-list-private">
          {data.guest_private ? "공개글로 전환" : "비밀글로 전환"}
        </p>
        <p className="guest-list-update" onClick={() => clickUpdate()}>
          {updating ? "등록" : "수정"}
        </p>
        <p className="guest-list-delete" onClick={() => guestDelete()}>
          삭제
        </p>
      </section>
      <section className="guest-body">
        <div className="guest-img"></div>
        <div className="guest-content">
          {updating ? (
            <textarea
              className="guest-update-content"
              defaultValue={data.guest_content}
              value={update_content}
              onChange={onChange}
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
