import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/Board.css";

function BoardList() {
  const navigate = useNavigate();
  const [board_list, setBoard_list] = useState([]);
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");

  const fetchList = async () => {
    const res = await fetch("http://localhost:8080/room/board");
    const list = await res.json();
    setBoard_list(list);
  };

  const selectHandler = (e) => {
    // 검색 select box 선택하면 실행되는 메서드
    setSelect(e.target.value);
  };

  const searchText = (e) => {
    setSearch(e.target.value);
  };

  // const clickSearch = useCallback(async () => {
  //   await fetch(`http://localhost:8080/room/board/search?query=${search}`).then(
  //     (res) => {
  //       console.log(res.json());
  //     }
  //   );
  // });

  const clickSearch = useCallback(async () => {
    const res = await fetch(
      `http://localhost:8080/room/board/search?query=${search}`
    );
    const result = await res.json();
    setBoard_list(result);
  });

  useEffect(() => {
    fetchList();
  }, []);

  const boardList = board_list.map((item) => {
    const date = item.boardCreateAt.split(" ");
    return (
      <tr>
        <td>{item.boardSeq}</td>
        <td
          className="board-list-title"
          onClick={() => navigate(`/room/board/${item.boardSeq}`)}
        >
          {item.boardTitle}
        </td>
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
            <th width="10%"></th>
            <th width="55%">제목</th>
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
      <div className="search-box">
        <select value={select} onChange={selectHandler}>
          <option>제목만</option>
          <option>제목+내용</option>
          <option>내용만</option>
        </select>
        <input value={search} onChange={searchText} />
        <button onClick={() => clickSearch()}>검색</button>
      </div>
    </div>
  );
}

export default BoardList;
