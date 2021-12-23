import React, { useState } from "react";
import "../../css/Search.css";

// 메인화면 - 미니홈피 검색 페이지
function SearchMain() {
  const { searchList, setSearchList } = useState([]);

  const fetchResult = async () => {};

  return (
    <>
      <div className="search-box">
        <select>
          <option>미니홈피명</option>
          <option>회원이름</option>
        </select>
        <input placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>
      <section className="search-result-box">
        <p></p>
      </section>
    </>
  );
}

export default SearchMain;
