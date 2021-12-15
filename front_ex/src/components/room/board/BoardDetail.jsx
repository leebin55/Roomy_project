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

  const [heart, setHeart] = useState(false); // 하트 눌렀었는지. 비회원이면 false 모양이 기본값으로 들어가도록 false로 초기값 지정
  const [heart_num, setHeart_num] = useState(""); // 이 글의 하트수

  const fetchDetail = async () => {
    const res = await fetch(`http://localhost:8080/room/board/${board_seq}`);
    const data = await res.json();
    // console.log(data);
    setDetail(data);
    setHeart(data.checkLike);
    // [위] 사용자가 하트를 눌렀었는지 표시하기 위함
    setHeart_num(data.boardLike);
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

  const clickHeart = () => {
    setHeart(!heart);
    fetchHeart();
  };

  const fetchHeart = async () => {
    const res = await fetch("http://localhost:8080/room/board/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardSeq: detail.boardSeq }),
    });
    const data = await res.json();
    setHeart_num(data);
  };

  useEffect(async () => {
    await fetchDetail();
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
            <p className="board-detail-head-date">{detail.boardCreateAt}</p>
          </div>

          <div
            className="board-detail-content"
            dangerouslySetInnerHTML={{ __html: detail.boardContent }}
          />
          <div className="board-heart-box">
            {heart ? (
              <FavoriteIcon
                className="board-heart"
                onClick={() => clickHeart()}
              />
            ) : (
              <FavoriteBorderIcon
                className="board-heart"
                onClick={() => clickHeart()}
              />
            )}
            <p>{heart_num}</p>
          </div>
          {/* 정확히 하트를 눌러야 클릭되게 할 수 있게 아이콘에 onClick */}
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
