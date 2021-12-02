import { React, useState, useEffect } from "react";
import "../../../css/Guest.css";
import GuestItem from "./GuestItem";

function GuestMain() {
  const [content, setContent] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [contentList, setContentList] = useState([]);

  const guestPrivate = () => {
    setPp((pp) => !pp);
  };

  const onChange = (e) => {
    // const g_content = e.target.value;
    // setContent({ ...content, g_content });
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
  };

  // useEffect(() => {
  //   guestList();
  // }, []);

  return (
    <>
      <section className="guest_list">
        {contentList == null ? "아직 등록된 방명록이 없습니다" : "방명록 있음"}
      </section>
      <section className="guest_write">
        <div className="guest_write_private" onClick={guestPrivate}>
          {pp ? "비공개" : "공개"}
        </div>
        <textarea
          name="guest_write_content"
          value={content}
          onChange={onChange}
        />
        <button onClick={guestInsert}>등록</button>
      </section>
    </>
  );
}

export default GuestMain;
