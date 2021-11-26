import React from "react";
import Feed from "./Feed";
import SearchIcon from "@mui/icons-material/Search";
import "../css/Feeds.css";

function Feeds() {
  return (
    <div>
      <div className="search-box">
        <SearchIcon />
        <input placeholder="검색어를 입력하세요" />
      </div>
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
}

export default Feeds;
