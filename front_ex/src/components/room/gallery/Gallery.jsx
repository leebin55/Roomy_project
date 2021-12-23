import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import GalleryContextProvider from '../../../context/GalleryContextProvider';
import GalleryWrite from './GalleryWrite';
import GalleryList from './galleryList/GalleryList';
import GalleryUpdate from './GalleryUpdate';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import '../../../css/gallery/Gallery.css';
import axiosInstance from '../../../utils/AxiosInstance';

function Gallery() {
  // url 에서 boardState= 을 뽑아오기 위해서(GalleryContextProvider 이용하기 위해)
  // 굳이 url query string 을 사용하는 이유
  //  (http://localhost:3000/room/gallery/1) URL 로
  // GalleryDetail component 를 불러온다
  // GalleryDetail 에 들어가서  수정을 해야되서
  // GalleryDetail d에서 바로  GalleryUpdate 를 부르면
  // Editor 를 재사용할 수 도 없고 img 를 수정 못한다.
  // Gallery 에서  <GalleryContextProvider> 로
  // GalleryWrite 와  GalleryList 를 감싼다 그래서  Detail 로 가면
  // Update 를 할때  ContextProvider 를 사용할 수 없어서
  // 다시  Gallery 부분으로 돌아와서 query-string 을 이용해서
  // GalleryUpdate 부름
  //
  const location = useLocation();
  const { board_state, board_seq } = queryString.parse(location.search);
  const [isWrite, setIsWrite] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { userId } = useParams();

  // 로그인한 유저와 room 주인 아이디 확인 (본인만 글쓰기 가능)
  const checkUser = async () => {
    await axiosInstance.get(`/room/${userId}/`);
  };
  useEffect(() => {
    // board_state와  board_seq 가 존재하면
    //isUpdate는  true
    console.log('userId : ', userId);
    if (board_state && board_seq) {
      setIsUpdate(true);
    }
  }, []);
  return (
    <GalleryContextProvider>
      <h1>갤러리</h1>
      <div className="gallery-btns">
        {isUpdate ? (
          <GalleryUpdate boardSeq={board_seq} userId={userId} />
        ) : (
          <>
            {' '}
            {!isWrite ? (
              <div>
                <button
                  onClick={() => {
                    setIsWrite(!isWrite);
                  }}
                >
                  {' '}
                  <CreateIcon />
                  글쓰기
                </button>
                <GalleryList userId={userId} />
              </div>
            ) : (
              <GalleryWrite
                isWrite={isWrite}
                setIsWrite={setIsWrite}
                userId={userId}
              />
            )}
          </>
        )}
      </div>
    </GalleryContextProvider>
  );
}

export default Gallery;
