import React from "react";
import { Routes, Route } from "react-router-dom";
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from "./board/BoardWrite";

function Board() {
  return (
    <Routes>
      <Route path="/" element={<BoardList />} />
      <Route path=":id" element={<BoardDetail />} />
      <Route path="write" element={<BoardWrite />} />
    </Routes>
  );
}

export default Board;
