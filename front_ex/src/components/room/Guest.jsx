import React from "react";
import GuestContextProvider from "../../context/GuestContextProvider";
import "../../css/Guest.css";
import GuestMain from "./guest/GuestMain";

function Guest() {
  return (
    <GuestContextProvider>
      <GuestMain />
    </GuestContextProvider>
  );
}

export default Guest;
