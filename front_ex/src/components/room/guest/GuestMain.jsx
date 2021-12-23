import { React, useState, useEffect } from "react";
import "../../../css/Guest.css";
import GuestItem from "./GuestItem";
import { useParams } from "react-router-dom";

function GuestMain() {
  const [guest_list, setGuest_list] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await fetch(`http://localhost:8080/room/${userId}/guest`);
    const data = await response.json();
    setGuest_list(data);
  };

  // No 표시 하기 위해 리스트 개수 세기
  let list_length = guest_list.length;

  return (
    <div className="guest-container">
      <section className="guest-list">
        {guest_list.length > 0 ? (
          guest_list.map((item) => {
            return (
              <GuestItem
                data={item}
                index={--list_length}
                fetchList={fetchList}
              />
            );
          })
        ) : (
          <div className="guest-item-box">
            <p>아직 등록된 방명록이 없습니다</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default GuestMain;
