import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import GalleryUpdate from './GalleryUpdate';

function GalleryDetail() {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);

  //http://localhost:3000/room/gallery/2 에 board_seq 값 가져오기
  const { board_seq } = useParams();
  const [galleryDetail, setGalleryDetail] = useState({
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

  const updateClick = () => {
    setIsUpdate(!isUpdate);
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
            `http://localhost:8080/room/gallery/delete/${galleryDetail.boardSeq}`
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
      {!isUpdate ? (
        <div>
          <button onClick={updateClick}>수정</button>
          <button onClick={deleteClick}>
            <DeleteIcon /> 삭제
          </button>

          <p>{galleryDetail.boardSeq}</p>
          <p>{galleryDetail.boardTitle}</p>

          <div
            className="gallery-post-content"
            dangerouslySetInnerHTML={{ __html: galleryDetail.boardContent }}
          />
          <p>{galleryDetail.boardCreateAt}</p>
          <p>{galleryDetail.boardLike}</p>
        </div>
      ) : (
        <GalleryUpdate gallery={galleryDetail} setGallery={setGalleryDetail} />
      )}
    </div>
  );
}

export default GalleryDetail;
