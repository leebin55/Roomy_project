import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router";
import BoardWrite from "./BoardWrite";
import "../../../css/Board.css";

function BoardDetail() {
  const navigate = useNavigate();
  const { board_seq } = useParams();

  const [detail, setDetail] = useState([]);

  const [isDetail, setIsDetail] = useState(true);

  const fetchDetail = async () => {
    const res = await fetch(`http://localhost:8080/room/board/${board_seq}`);
    const data = await res.json();
    setDetail(data);
  };

  const clickUpdate = async () => {
    if (window.confirm("글을 수정하시겠습니까?")) {
      setIsDetail(false);
    }
  };

  const fetchDelete = async () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      await fetch(`http://localhost:8080/room/board/${board_seq}`, {
        method: "DELETE",
      }).then((res) => {
        if (res?.ok) {
          alert("삭제되었습니다");
          navigate("/room/board");
        }
      });
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="board-detail-container">
      {isDetail ? (
        <div>
          <div className="board-detail-title">
            <p>{detail.boardTitle}</p>
            <button onClick={() => clickUpdate()}>수정</button>
            <button onClick={() => fetchDelete()}>삭제</button>
          </div>
          <div className="board-detail-head-box">
            <p className="board-detail-head-like">

              <FavoriteIcon className="heart" />

              {detail.boardLike}
            </p>
            <p className="board-detail-head-date">{detail.boardCreateAt}</p>
          </div>

          <div
            className="board-detail-content"
            dangerouslySetInnerHTML={{ __html: detail.boardContent }}
          />


          <div>
            <FavoriteBorderIcon />
          </div>
        </div>
      ) : (
        <>
          <BoardWrite upData={detail} />
        </>
      )}
    </div>
  );
}

export default BoardDetail;
