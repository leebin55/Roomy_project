import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function GalleryDetail() {
  //http://localhost:3000/room/gallery/2 에 board_seq 값 가져오기
  const { board_seq } = useParams();
  const [galleryDetail, setGalleryDetail] = useState({
    board_code: '',
    board_content: '',
    board_create_at: '',
    board_like: '',
    board_private: '',
    board_seq: '',
    board_title: '',
    board_update_at: '',
    board_user_seq: '',
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

  return (
    <div>
      <button>수정</button>
      <button>삭제</button>

      <p>{galleryDetail.board_seq}</p>
      <p>{galleryDetail.board_title}</p>
      <p>{galleryDetail.board_content}</p>
      <p>{galleryDetail.board_create_at}</p>
      <p>{galleryDetail.board_like}</p>
    </div>
  );
}

export default GalleryDetail;
