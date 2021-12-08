import React from "react";
import { Routes, Route } from "react-router-dom";
import BoardList from "./board/BoardList";
import BoardDetail from "./board/BoardDetail";
import BoardWrite from "./board/BoardWrite";
import BoardContextProvider from "../../context/BoardContextProvider";

function Board() {
  return (
    <BoardContextProvider>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path=":board_seq" element={<BoardDetail />} />
        <Route path="write" element={<BoardWrite />} />
      </Routes>
    </BoardContextProvider>
  );
}

export default Board;
