import React, { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuillToolbar from './QuillToolbar';
import Editor from './Editor';
import { useNavigate } from 'react-router-dom';
import { useGalleryContext } from '../../../context/GalleryContextProvider';
import axios from 'axios';
import GalleryDetail from './GalleryDetail';

function GalleryUpdate({ boardSeq }) {
  const { galleryInfo, setGalleryInfo, setContent, content, setTitle, title } =
    useGalleryContext();

  useEffect(() => {
    viewGalleryInfo();
  }, []);

  const viewGalleryInfo = async () => {
    try {
      // userParam
      await axios
        .get(`http://localhost:8080/room/gallery/detail?board_seq=${boardSeq}`)
        .then((res) => {
          if (res.status === 200) {
            const gallery = res.data;
            setContent(gallery.boardContent);
            setTitle(gallery.boardTitle);
          }
        });
    } catch (error) {
      alert('데이터를 불러올수 없음.');
      throw error;
    }
  };

  const dataSetting = () => {
    setTitle(GalleryDetail.boar);
  };
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <label>Title : </label>
        <input name="board_title" value={title} />
        <button
          onClick={() => {
            navigate('/room/gallery');
          }}
        >
          <ArrowBackIcon />
          뒤로
        </button>
        <button>
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
