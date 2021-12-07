import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuillToolbar from './QuillToolbar';
import Editor from './Editor';
import { useNavigate } from 'react-router-dom';
import { useGalleryContext } from '../../../context/GalleryContextProvider';
import axios from 'axios';
import moment from 'moment';

function GalleryUpdate({ boardSeq }) {
  const {
    galleryInfo,
    setGalleryInfo,
    setContent,
    setTitle,
    title,
    content,
    setIsUpdate,
  } = useGalleryContext();

  useEffect(() => {
    viewGalleryInfo();
  }, []);

  const viewGalleryInfo = async () => {
    try {
      await axios
        .get(`http://localhost:8080/room/gallery/detail?board_seq=${boardSeq}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setGalleryInfo(res.data);
            setContent(galleryInfo.boardContent);
            setTitle(galleryInfo.boardTitle);
          }
        });
    } catch (error) {
      alert('데이터를 불러올수 없음.');
      throw error;
    }
  };

  const updateClick = () => {
    setGalleryInfo({
      ...galleryInfo,
      boardContent: content,
      boardTitle: title,
      boardUpdateAt: moment().format('YYYY-MM-DD HH:mm'),
    });
  };
  const navigate = useNavigate();

  const updateGallery = async () => {
    try {
      axios
        .put('http://localhost:8080/room/gallery/update', galleryInfo)
        .then((res) => {});
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
