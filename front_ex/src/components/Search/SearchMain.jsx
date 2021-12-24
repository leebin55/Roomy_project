import React, { useState } from "react";
import "../../css/Search.css";

// 메인화면 - 미니홈피 검색 페이지
function SearchMain() {
  const [searchResult, setSearchResult] = useState([]); // 검색 결과 리스트
  const [isRoomName, setIsRoomName] = useState(true); // 미니홈피명으로 검색하는지
  const [search, setSearch] = useState({ select: 0, query: "" });

  const fetchResult = async () => {};

  // 검색 select box 선택하면 onChange
  const searchHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // 검색 버튼 클릭하면 onClick
  const fetchSearch = async () => {
    if (search.select == 0) {
      setIsRoomName(true);
    } else if (search.select == 1) {
      setIsRoomName(false);
    }

    console.log(search.select, search.query);

    const res = await fetch(
      `http://localhost:8080/search?select=${search.select}&query=${search.query}`
    );
    const result = await res.json();
    setSearchResult(result);
  };

  const searchList = () =>
    searchResult.map((item) => {
      return <div className="search-result">{item.roomName}</div>;
    });

  return (
    <>
      <div className="search-box">
        <select name="select" value={search.select} onChange={searchHandler}>
          <option value="0">미니홈피명</option>
          <option value="1">회원이름</option>
        </select>
        <input
          name="query"
          value={search.query}
          onChange={searchHandler}
          placeholder="검색어를 입력하세요"
        />
        <button
          onClick={() => {
            fetchSearch();
          }}
        >
          검색
        </button>
      </div>
      <section className="search-result-box">
        {/*
		  미니홈피명으로 검색했고, 검색결과가 있으면 검색결과 리스트 출력
		  미니홈피명으로 검색하지 않았으면(회원 이름으로 검색했으면) 준비중입니다 출력
		  미니홈피명으로 검색했고, 검색결과가 없으면 일치하는 미니홈피가 없습니다 출력
		   */}
        {isRoomName && searchResult.length > 0 ? (
          searchList()
        ) : searchResult.length < 1 ? (
          <p>일치하는 미니홈피가 없습니다</p>
        ) : (
          <p>준비중입니다</p>
        )}
      </section>
    </>
  );
}

export default SearchMain;
