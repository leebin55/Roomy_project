import React, { useState } from "react";
import { useParams } from "react-router-dom";

function GuestItem({ data, index, fetchList }) {
  const [updating, setUpdating] = useState(false);
  const [update_content, setUpdate_content] = useState();
  const { userId } = useParams();

  const onChange = (e) => {
    setUpdate_content(e.target.value);
  };

  const guestDelete = async () => {
    if (window.confirm("방명록을 삭제하시겠습니까?")) {
      await fetch(
        `http://localhost:8080/room/${userId}/guest/${data.guestSeq}`,
        {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
        }
      ).then((res) => {
        if (res?.ok) {
          alert("삭제되었습니다");
          fetchList();
        }
      });
    }
  };

  const clickUpdate = () => {
    if (updating) {
      if (update_content.trim() === "") {
        alert("방명록을 입력하세요");
        return;
      } else if (update_content === data.guest_content) {
        alert("변경된 내용이 없습니다");
        return;
      }
      guestUpdate();
    } else if (!updating) {
      setUpdate_content(data.guestContent);
    }
    setUpdating(!updating);
  };

  const guestUpdate = async () => {
    await fetch(`http://localhost:8080/room/${userId}/guest/${data.guestSeq}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestContent: update_content,
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
          {index + 1}
        </p>
        <p>{data.guestWriterName}</p>
        <p>&#127968;</p>
        <p>{data.guestCreateAt}</p>
        <p className="guest-list-private">
          {data.guestPrivate ? "공개글로 전환" : "비밀글로 전환"}
        </p>
        <p className="guest-list-update" onClick={() => clickUpdate()}>
          {updating ? "등록" : "수정"}
        </p>
        <p className="guest-list-delete" onClick={() => guestDelete()}>
          삭제
        </p>
      </section>
      <section className="guest-body">
        <div className="guest-img-box"></div>
        <div className="guest-content">
          {updating ? (
            <textarea
              className="guest-update-content"
              defaultValue={data.guestContent}
              value={update_content}
              onChange={onChange}
            ></textarea>
          ) : (
            <>
              {data.guestPrivate ? "🔒 " : ""}
              {data.guestContent}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default GuestItem;
