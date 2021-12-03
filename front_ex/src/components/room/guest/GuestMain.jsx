import { React, useState, useEffect } from "react";
import "../../../css/Guest.css";
import GuestItem from "./GuestItem";

function GuestMain() {
  const [insert_content, setInsert_content] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [guest_list, setGuest_list] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [update_content, setUpdate_content] = useState("");

  const fetchList = async () => {
    const response = await fetch("http://localhost:8080/room/guest");
    const data = await response.json();
    setGuest_list(data.reverse());
  };

  useEffect(fetchList, [setGuest_list]);

  const guestPrivate = () => {
    setPp((pp) => !pp);
  };

  const onInsertChange = (e) => {
    // const g_content = e.target.value;
    // setContent({ ...content, g_content });
    setInsert_content(e.target.value);
  };

  const onUpdateChange = (e) => {
    setUpdate_content(e.target.value);
  };

  const guestInsert = async () => {
    if (insert_content === "") {
      alert("방명록을 입력하세요");
      return;
    }
    await fetch("http://localhost:8080/room/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_content: insert_content,
        guest_private: pp,
      }),
    });
    setPp(false);
    setInsert_content("");
    fetchList();
  };

  const guestDelete = async (e) => {
    if (window.confirm("방명록을 삭제하시겠습니까?")) {
      await fetch(`http://localhost:8080/room/guest/${e.target.dataset.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res?.ok) {
          alert("삭제되었습니다");
        }
      });
    }
  };

  return (
    <div className="guest_container">
      <section className="guest_list">
        {guest_list.length > 0 ? (
          guest_list.map((item) => {
            <div className="guest_item_box">
              <section className="guest_head">
                <p>
                  <span>NO.</span>
                  {item.guest_seq}
                </p>
                <p>{item.guest_writer_name}</p>
                <p>&#127968;</p>
                <p>{item.guest_create_at}</p>
                <p className="guest_list_private">
                  {item.guest_private ? "공개글로 전환" : "비밀글로 전환"}
                </p>
                <p
                  className="guest_list_update"
                  onClick={() => setUpdating(!updating)}
                >
                  {updating ? "등록" : "수정"}
                </p>
                <p
                  className="guest_list_delete"
                  onClick={guestDelete}
                  data-id={item.id}
                >
                  삭제
                </p>
              </section>
              <section className="guest_body">
                <div className="guest_img"></div>
                <div className="guest_content">
                  {updating ? (
                    <textarea
                      className="guest_update_content"
                      defaultValue={item.guest_content}
                      value={update_content}
                      onChange={onUpdateChange}
                    ></textarea>
                  ) : (
                    <>
                      {item.guest_private ? "🔒 " : ""}
                      {item.guest_content}
                    </>
                  )}
                </div>
              </section>
            </div>;
          })
        ) : (
          <div className="guest_item_box">아직 등록된 방명록이 없습니다</div>
        )}
      </section>
      <section className="guest_write">
        <div className="guest_write_private" onClick={guestPrivate}>
          {pp ? "비공개" : "공개"}
        </div>
        <textarea
          name="guest_write_content"
          value={insert_content}
          onChange={onInsertChange}
        />
        <button onClick={guestInsert}>등록</button>
      </section>
    </div>
  );
}

export default GuestMain;
