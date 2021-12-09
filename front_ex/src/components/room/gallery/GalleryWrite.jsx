import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';
import { useGalleryContext } from '../../../context/GalleryContextProvider';
import QuillToolbar from './QuillToolbar';

// 갤러리 글 등록하는 부분
function GalleryWrite({ isWrite, setIsWrite }) {
  const navigate = useNavigate();
  const { title, setTitle, content, setContent, galleryImg, setGalleryImg } =
    useGalleryContext();

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const writeSubmit = async () => {
    console.log(galleryImg);
    if (title.trim() !== '' && content.trim() !== '' && galleryImg !== '') {
      try {
        await axios
          .post('http://localhost:8080/room/gallery/write', {
            boardUserSeq: 1,
            boardTitle: title,
            boardContent: content,
            boardCreateAt: moment().format('YYYY-MM-DD HH:mm'),
            boardCode: 1,
            imgURL: [galleryImg],
          })
          .then((res) => {
            if (res.data === 'ok') {
              alert('글 등록 완료');
              setGalleryImg('');
              setIsWrite(!isWrite);
              setTitle('');
              setContent('');
              navigate('/room/gallery');
            }
          });
      } catch (error) {
        throw error;
      } //catch end
    } //if end
    else {
      if (galleryImg === '') {
        alert('사진을 등록해 주세요');
        return;
      }
      alert('제목과 내용은 입력해야 합니다.');
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Title : </label>
          <input name="board_title" value={title} onChange={titleChange} />
        </div>
        <QuillToolbar toolbarId={'tg'} />
        <Editor toolbarId={'tg'} />
        <button type="button" onClick={writeSubmit}>
          등록
        </button>
      </form>
    </div>
  );
}

export default GalleryWrite;
