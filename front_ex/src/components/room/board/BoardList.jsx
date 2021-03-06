import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../css/Board.css";

function BoardList() {
  const navigate = useNavigate();

  const [board_list, setBoard_list] = useState([]); // 화면에 출력될 일반 게시판 글 list
  const [select, setSelect] = useState("0"); // 검색 select box 선택한 것
  const [search, setSearch] = useState(""); // 검색 input box 에 입력한 내용
  // const [start_page, setStart_page] = useState("1");
  // const [end_page, setEnd_page] = useState("1");
  const { userId } = useParams();

  const fetchList = async () => {
    const res = await fetch(`http://localhost:8080/room/${userId}/board`);
    const result = await res.json();
    // if (result?.content?.length > 0) setBoard_list(result?.content);
    console.log(result);
    setBoard_list(result);
  };

  // 검색 select box 선택하면 실행
  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  // 검색 input 입력하면 실행
  const searchText = (e) => {
    setSearch(e.target.value);
  };

  // 검색 버튼 클릭하면 실행
  const fetchSearch = useCallback(async () => {
    if (search.trim() === "") {
      alert("검색어를 입력하세요");
      return;
    }
    const res = await fetch(
      `http://localhost:8080/room/${userId}/board/search?query=${search}&select=${select}`
    );
    const result = await res.json();
    setBoard_list(result);
    setSelect("0");
    setSearch("");
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
          onClick={() => navigate(`/room/${userId}/board/${item.boardSeq}`)}
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
            <td colSpan="5">게시물이 없습니다</td>
          )}
        </tbody>
      </table>
      <div className="btn-write-box">
        <button onClick={() => navigate(`/room/${userId}/board/write`)}>
          글쓰기
        </button>
      </div>
      {/* <div className="board-page-box">
        <div>1</div>
      </div> */}
      <div className="board-search-box">
        <select value={select} onChange={selectHandler}>
          <option value="0">제목만</option>
          <option value="1">제목+내용</option>
          <option value="2">내용만</option>
        </select>
        <input value={search} onChange={searchText} />
        <button onClick={() => fetchSearch()}>검색</button>
      </div>
    </div>
  );
}

export default BoardList;
