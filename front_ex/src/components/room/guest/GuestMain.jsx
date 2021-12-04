import { React, useState, useEffect } from "react";
import "../../../css/Guest.css";
import GuestItem from "./GuestItem";

function GuestMain() {
  const [content, setContent] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [guest_list, setGuest_list] = useState([]);

  const guestPrivate = () => {
    setPp((pp) => !pp);
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const guestInsert = async () => {
    if (content === "") {
      alert("방명록을 입력하세요");
      return;
    }
    await fetch("http://localhost:8080/room/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guest_content: content,
        guest_private: pp,
      }),
    });
    setPp(false);
    setContent("");
    fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await fetch("http://localhost:8080/room/guest");
    const data = await response.json();
    setGuest_list(data.reverse());
  };

  return (
    <div className="guest_container">
      <section className="guest_list">
        {guest_list.length > 0 ? (
          guest_list.map((item) => {
            return (
              <GuestItem data={item} fetchList={fetchList} content={content} />
            );
          })
        ) : (
          <div className="guest_item_box">아직 등록된 방명록이 없습니다</div>
        )}
      </section>
      <section className="guest_write">
        <div className="guest_write_private" onClick={() => guestPrivate()}>
          {pp ? "비공개" : "공개"}
        </div>
        <textarea
          name="guest_write_content"
          value={content}
          onChange={onChange}
        />
        <button onClick={() => guestInsert()}>등록</button>
      </section>
    </div>
  );
}

export default GuestMain;
