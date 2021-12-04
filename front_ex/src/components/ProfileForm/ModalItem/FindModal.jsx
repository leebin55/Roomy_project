import React from "react";
import { useLoginContext } from "../../../context/LoginContextProvider";

function FindModal() {
  const { loginClick, joinClick, findClick } = useLoginContext();
  return (
    <>
      <div>준비중...</div>
    </>
  );
}

export default FindModal;
