import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useGuestContext = () => useContext(AppContext);

function GuestContextProvider({ children }) {
  const [guest_list, setGuest_list] = useState([]); // db에 저장돼있는 방명록 리스트
  const [insert_content, setInsert_content] = useState(""); // 입력한 방명록 작성 내용
  const [pp, setPp] = useState(false); // 입력한 방명록 공개여부
  const [update_content, setUpdate_content] = useState(""); // 수정할 방명록 작성 내용
  const [updating, setUpdating] = useState(false); // 방명록 수정 중인지 여부

  const fetchList = async () => {
    const res = await fetch("http://localhost:8080/room/guest");
    const data = await res.json();
    await setGuest_list(data.reverse());
  };

  const onInsertChange = (e) => {
    setInsert_content(e.target.value);
  };

  const onUpdateChange = (e) => {
    setUpdate_content(e.target.value);
  };

  const clickPp = () => {
    alert("씨발");
    setPp(!pp);
  };

  const guestInsert = async () => {
    alert("씨발진짜개씨팔개좆같네");
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
    fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  const data = {
    guest_list,
    insert_content,
    pp,
    update_content,
    updating,
    onInsertChange,
    onUpdateChange,
    clickPp,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}

export default GuestContextProvider;
