import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Setting.css";

function Setting() {
  const navigate = useNavigate();
  const [room_name, setRoom_name] = useState("");
  const [room_introduce, setRoom_introduce] = useState("");
  const { userId } = useParams();

  const onChangeRoomName = (e) => {
    setRoom_name(e.target.value);
  };

  const onChangeRoomIntroduce = (e) => {
    setRoom_introduce(e.target.value);
  };

  // 미니홈피 정보들(미니홈피명, 소개글) 불러오기
  const fetchSetting = async () => {
    const res = await fetch(`http://localhost:8080/room/${userId}`);
    const data = await res.json();
    setRoom_name(data.roomName);
    setRoom_introduce(data.roomIntroduce);
  };

  // 미니홈피 정보 수정
  const settingUpdate = async () => {
    await fetch(`http://localhost:8080/room/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        roomName: room_name,
        roomIntroduce: room_introduce,
      }),
    }).then((res) => {
      if (res?.ok) {
        navigate(`/room/${userId}/setting`);
        alert("수정되었습니다");
      }
    });
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <div className="setting-container">
      <h1>미니홈피 설정</h1>
      <div className="setting-input-box">
        <input
          className="setting-input"
          defaultValue={room_name}
          value={room_name}
          onChange={(e) => onChangeRoomName(e)}
        ></input>
        <textarea
          className="setting-textfield"
          defaultValue={room_introduce}
          value={room_introduce}
          onChange={(e) => onChangeRoomIntroduce(e)}
        ></textarea>
        <div className="setting-btn-box">
          <button onClick={() => settingUpdate()}>수정</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
