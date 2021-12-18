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
    setRoom_name(e.target.value);
  };

  const fetchSetting = async () => {
    const res = await fetch(`http://localhost:8080/room/${userId}/setting`);
    const data = await res.json();
    setRoom_name(data.roomName);
    setRoom_introduce(data.room_introduce);
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
          placeholder="미니홈피명"
          onChange={(e) => onChangeRoomName()}
        ></input>
        <textarea
          className="setting-textfield"
          placeholder="소개글"
          onChange={(e) => onChangeRoomIntroduce()}
        ></textarea>
        <div className="setting-btn-box">
          <button>수정</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
