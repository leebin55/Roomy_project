import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function GalleryDetail() {
  const navigate = useNavigate();

  //http://localhost:3000/room/gallery/2 에 board_seq 값 가져오기
  const { board_seq } = useParams();
  const [galleryDetail, setGalleryDetail] = useState({
    boardCode: "",
    boardContent: "",
    boardCreateAt: "",
    boardLike: "",
    boardPrivate: "",
    boardSeq: "",
    boardTitle: "",
    boardUpdateAt: "",
    boardUserSeq: "",
  });

  useEffect(() => {
    viewGalleryDetail();
  }, []);

  const viewGalleryDetail = async () => {
    try {
      await axios
        .get(`http://localhost:8080/room/gallery/detail?board_seq=${board_seq}`)
        .then((res) => {
          if (res.status === 200) {
            //console.log(res.data);
            setGalleryDetail(res.data);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  const updateClick = () => {};
  const deleteClick = async () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      try {
        axios
          .get(
            `http://localhost:8080/room/gallery/delete/${galleryDetail.boardSeq}`
          )
          .then((res) => {
            if (res.status === 200) {
              alert("삭제되었습니다.");
              navigate("/room/gallery");
            }
          });
      } catch (error) {
        throw error;
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <button onClick={updateClick}>수정</button>
      <button onClick={deleteClick}>
        <DeleteIcon /> 삭제
      </button>

      <p>{galleryDetail.boardSeq}</p>
      <p>{galleryDetail.boardTitle}</p>
      <p>{galleryDetail.boardContent}</p>
      <p>{galleryDetail.boardCreateAt}</p>
      <p>{galleryDetail.boardLike}</p>
    </div>
  );
}

export default GalleryDetail;
