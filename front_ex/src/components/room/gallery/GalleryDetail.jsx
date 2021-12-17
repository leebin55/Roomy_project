import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../css/gallery/GalleryDetail.css';

function GalleryDetail() {
  const navigate = useNavigate();
  //http://localhost:3000/room/gallery/2 에 board_seq 값 가져오기
  const { userId, board_seq } = useParams();
  const [galleryInfo, setGalleryInfo] = useState({
    boardCode: '',
    boardContent: '',
    boardCreateAt: '',
    boardLike: '',
    boardPrivate: '',
    boardSeq: '',
    boardTitle: '',
    boardUpdateAt: '',
    boardUserSeq: '',
  });

  useEffect(() => {
    viewGalleryInfo();
  }, []);

  const viewGalleryInfo = async () => {
    try {
      // userParam
      await axios
        .get(
          `http://localhost:8080/room/${userId}/gallery/detail?board_seq=${board_seq}`
        )
        .then((res) => {
          if (res.status === 200) {
            //console.log(res.data);
            setGalleryInfo(res.data);
          }
        });
    } catch (error) {
      alert('데이터를 불러올수 없음.');
      throw error;
    }
  };

  const updateClick = () => {
    navigate(
      `/room/${userId}/gallery?board_state=update&board_seq=${board_seq}`
    );
    // try {
    //   axios
    //     .get(
    //       `http://localhost:8080/room/gallery/update/${GalleryDetail.boarsSeq}`
    //     )
    //     .then((res) => {
    //       if (res.status === 200) {
    //         navigate(`/room/gallery/update/:${GalleryDetail.boarsSeq}`);
    //       }
    //     });
    // } catch (error) {}
  };
  const deleteClick = async () => {
    const result = window.confirm('삭제하시겠습니까?');
    if (result) {
      try {
        axios
          .get(
            `http://localhost:8080/room/${userId}/gallery/delete/${galleryInfo.boardSeq}`
          )
          .then((res) => {
            if (res.status === 200) {
              alert('삭제되었습니다.');
              navigate('/room/gallery');
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
      <div>
        <div className="gallery-detail-header">
          <button
            onClick={() => {
              navigate('/room/gallery');
            }}
          >
            뒤로
          </button>
          <p>{galleryInfo.boardSeq}</p>
          <h3>{galleryInfo.boardTitle}</h3>
          <button className="gallery-btn-modify" onClick={updateClick}>
            수정
          </button>
          <button onClick={deleteClick}>삭제</button>
        </div>
        <div
          className="gallery-post-content"
          dangerouslySetInnerHTML={{ __html: galleryInfo.boardContent }}
        />
        <p>{galleryInfo.boardCreateAt}</p>
        <p>{galleryInfo.boardLike}</p>
      </div>
    </div>
  );
}

export default GalleryDetail;
