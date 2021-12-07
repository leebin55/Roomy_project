import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Navigate, useParams } from "react-router";
import "../../../css/Board.css";

function BoardDetail() {
  const { board_seq } = useParams();

  const [detail, setDetail] = useState([]);

  const fetchDetail = async () => {
    const res = await fetch(`http://localhost:8080/room/board/${board_seq}`);
    const data = await res.json();
    setDetail(data);
  };

  const fetchDelete = async () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      await fetch(`http://localhost:8080/room/board/${board_seq}`, {
        method: "DELETE",
      }).then((res) => {
        if (res?.ok) {
          alert("삭제되었습니다");
        }
      });
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="board-detail-container">
      <div className="board-detail-title">
        <p>{detail.boardTitle}</p>
        <button>수정</button>
        <button onClick={() => fetchDelete()}>삭제</button>
      </div>
      <div className="board-detail-head-box">
        <p className="board-detail-head-like">
          <FavoriteIcon />
          {detail.boardLike}
        </p>
        <p className="board-detail-head-date">{detail.boardCreateAt}</p>
      </div>
      <div className="board-detail-content">{detail.boardContent}</div>
      <div>
        <FavoriteBorderIcon />
      </div>
    </div>
  );
}

export default BoardDetail;
