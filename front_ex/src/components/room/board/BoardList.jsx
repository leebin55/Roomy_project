import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/Board.css";

function BoardList() {
  const navigate = useNavigate();
  const [board_list, setBoard_list] = useState([]);

  const fetchList = async () => {
    const res = await fetch("http://localhost:8080/room/board");
    const list = await res.json();
    setBoard_list(list.reverse());
  };

  useEffect(() => {
    fetchList();
  }, []);

  const boardList = board_list.map((item) => {
    const date = item.boardCreateAt.split(" ");
    return (
      <tr>
        <td>{item.boardSeq}</td>
        <td>{item.boardTitle}</td>
        <td>{date[0]}</td>
        <td>{item.boardHit}</td>
        <td>{item.boardLike}</td>
      </tr>
    );
  });

  return (
    <div className="board-container">
      <table>
        <thead>
          <tr>
            <th width="5%"></th>
            <th width="60%">제목</th>
            <th width="15%">작성일</th>
            <th width="10%">조회</th>
            <th width="10%">좋아요</th>
          </tr>
        </thead>
        <tbody>
          {board_list.length > 0 ? (
            boardList
          ) : (
            <td colSpan="5">아직 게시물이 없습니다</td>
          )}
        </tbody>
      </table>
      <div className="btn-write-box">
        <button onClick={() => navigate("/room/board/write")}>글쓰기</button>
      </div>
    </div>
  );
}

export default BoardList;
