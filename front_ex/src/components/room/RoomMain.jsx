import React, { useEffect, useState } from "react";

function RoomMain() {
  const [content, setContent] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [guest_list, setGuest_list] = useState([]);

  const fetchGuest = async () => {
    const res = await fetch("http://localhost:8080/room/guest?limit=4");
    const data = await res.json();
    setGuest_list(data.reverse());
  };

  const guestPrivate = () => {
    setPp((pp) => !pp);
  };

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const guestInsert = async () => {
    if (content.trim() === "") {
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
    // fetchList();
  };

  useEffect(() => {
    fetchGuest();
  }, []);

  return (
    <>
      <section className="main-top">
        <div className="main-recent-box"></div>
        <div className="main-list-box"></div>
      </section>
      <section className="main-bottom">
        <div className="main-guest">
          <div className="main-guest-box">
            <img src="/img/postit.png" />
            <p>{guest_list.length > 0 ? "있다" : "어서오세용^^"}</p>
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
        </div>
        <div className="guest-write">
          <div className="guest-write-private" onClick={() => guestPrivate()}>
            {pp ? "비공개" : "공개"}
          </div>
          <textarea
            name="guest-write-content"
            value={content}
            onChange={onChange}
          />
          <button onClick={() => guestInsert()}>등록</button>
        </div>
      </section>
    </>
  );
}

export default RoomMain;
