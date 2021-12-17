import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Setting() {
  const [room_name, setRoom_name] = useState("");
  const { userId } = useParams();

  const onChangeRoomName = (e) => {
    setRoom_name(e.target.value);
  };

  const onChangeRoomIntroduce = (e) => {
    setRoom_name(e.target.value);
  };

  const fetchSetting = async () => {
    await fetch(`http://localhost8080:/room/${userId}/setting`);
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <div>
      <h1>설정</h1>
      <div>
        <div>
          <p>사진</p>
        </div>
        <textfield onChange={(e) => onChangeRoomName()}></textfield>
      </div>
      <div>
        <textfield onChange={(e) => onChangeRoomIntroduce()}></textfield>
      </div>
      <button>수정</button>
    </div>
  );
}

export default Setting;
