import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RoomMain() {
  const [content, setContent] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [guest_list, setGuest_list] = useState([]);
  const { userId } = useParams();

  // 미니홈피 메인화면에서 방명록을 보여주기 위함
  const fetchGuest = async () => {
    const res = await fetch(
      `http://localhost:8080/room/${userId}/guest?limit=4`
    );
    const data = await res.json();
    setGuest_list(data);
  };

  // 미니홈피 메인화면 상단 최신글 부분 (미완성)
  // const fetchNewPost = async () => {
  //   const res = await fetch(`http://localhost:8080/room/${userId}/`)
  // }

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
    await fetch(`http://localhost:8080/room/${userId}/guest`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestContent: content,
        guestPrivate: pp,
      }),
    });
    setPp(false);
    setContent("");
    fetchGuest();
  };

  useEffect(() => {
    fetchGuest();
  }, []);

  return (
    <>
      <section className="main-top">
        <p className="main-recent-title">최근 게시물</p>
        <hr />
        <section className="main-top-box">
          <div className="main-recent-box">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className="main-list-box">
            <table>
              <tr>
                <td>
                  게시판 <span></span>
                </td>
                <td>
                  사진첩 <span></span>
                </td>
              </tr>
              <tr>
                <td>
                  할일 <span></span>
                </td>
                <td>
                  방명록 <span></span>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </section>
      </section>
      <section className="main-bottom">
        <div className="main-guest">
          {guest_list.length > 0 ? (
            guest_list.map((item) => (
              <div className="main-guest-box">
                <img src="/img/postit.png" alt="" />
                <p>{item.guestContent}</p>
              </div>
            ))
          ) : (
            <div className="main-guest-empty">
              💬 첫번째 방명록을 남겨보세요 ! 💖
            </div>
          )}
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
