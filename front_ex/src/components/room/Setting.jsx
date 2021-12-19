import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../css/Setting.css";

function Setting() {
  const [room_name, setRoom_name] = useState("");
  const [room_introduce, setRoom_introduce] = useState("");
  const { userId } = useParams();

  const onChangeRoomName = (e) => {
    setRoom_name(e.target.value);
  };

  const onChangeRoomIntroduce = (e) => {
    setRoom_introduce(e.target.value);
  };

  // (미완) 값 안넘어옴
  const fetchSetting = async () => {
    const res = await fetch(`http://localhost:8080/room/${userId}`);
    const data = await res.json();
    setRoom_name(data.roomName);
    setRoom_introduce(data.room_introduce);
  };

  // (미완) null 값으로 넘어감
  const settingUpdate = async () => {
    await fetch(`http://localhost:8080/room/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        roomName: room_name,
        roomIntroduce: room_introduce,
      }),
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
