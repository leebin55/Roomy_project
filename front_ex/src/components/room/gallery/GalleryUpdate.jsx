import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuillToolbar from './QuillToolbar';
import Editor from './Editor';
import { useNavigate } from 'react-router-dom';
import { useGalleryContext } from '../../../context/GalleryContextProvider';
import axios from 'axios';
import moment from 'moment';

function GalleryUpdate({ boardSeq, userId }) {
  const navigate = useNavigate();
  const {
    galleryInfo,
    setGalleryInfo,
    setContent,
    setTitle,
    title,
    content,
    setIsUpdate,
    galleryImgList,
  } = useGalleryContext();

  const viewGalleryInfo = async () => {
    try {
      await axios
        .get(
          `http://localhost:8080/room/${userId}/gallery/detail?board_seq=${boardSeq}`
        )
        .then(async (res) => {
          if (res.status === 200) {
            //res.data 에서 안빼오고
            //setGalleryInfo에 넣어서 galleryInfo.boardContent
            // 로 값을 넣어주면 값이 제대로 들어가지 않음
            // 순차적으로 코드가 실행되지 않는다
            setContent(res.data.boardContent);
            setTitle(res.data.boardTitle);
            setGalleryInfo(res.data);
          } // end if
        }); // end then
    } catch (error) {
      alert('데이터를 불러올수 없음.');
      throw error;
    }
  };

  useEffect(() => {
    viewGalleryInfo();
  }, []);

  const updateClick = async () => {
    const saveURL = galleryImgList.filter((gallery) =>
      content.includes(gallery)
    );
    try {
      await axios
        .put('http://localhost:8080/room/gallery/update', {
          ...galleryInfo,
          boardContent: content,
          boardTitle: title,
          boardUpdateAt: moment().format('YYYY-MM-DD HH:mm'),
          imgURL: saveURL,
        })
        .then((res) => {
          if (res.status === 200) {
            // setTitle('');
            // setContent('');
            // navigate('/room/gallery');
            // setGalleryImgList([]);
            navigate(`/room/gallery/${boardSeq}`);
          }
        });
    } catch (error) {
      alert('갤러리 수정 실패');
      throw error;
    }
  };

  return (
    <div>
      <div>
        <label>Title : </label>
        <input name="board_title" value={title} />
        <button
          onClick={() => {
            setIsUpdate(false);
            navigate('/room/gallery');
          }}
        >
          <ArrowBackIcon />
          뒤로
        </button>
        <button
          onClick={() => {
            updateClick();
          }}
        >
          <CheckCircleIcon />
          완료
        </button>
      </div>
      <QuillToolbar toolbarId={'tg_update'} />
      <Editor toolbarId={'tg_update'} />
    </div>
  );
}

export default GalleryUpdate;
