import React, { useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';
import QuillToolbar from './QuillToolbar';
import 'react-quill/dist/quill.snow.css';

function GalleryWrite() {
  const quillRef = useRef();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const writeSubmit = async () => {
    if (title.trim() !== '' && content.trim() !== '') {
      try {
        await axios
          .post('http://localhost:8080/room/gallery/write', {
            boardUserSeq: 1,
            boardTitle: title,
            boardContent: content,
            boardCreateAt: moment().format('YYYY-MM-DD HH:mm'),
            boardCode: 1,
          })
          .then((res) => {
            if (res.data === 'ok') {
              alert('글 등록 완료');
              navigate('/room/gallery');
            }
          });
      } catch (error) {
        throw error;
      }
    } else {
      alert('제목과 내용은 입력해야 합니다.');
    }
  };

  return (
    <div>
      <h1>gallery write</h1>
      <form>
        <div>
          <label>Title : </label>
          <input name="board_title" value={title} onChange={titleChange} />
        </div>
        <QuillToolbar toolbarId={'tg'} />
        <Editor toolbarId={'tg'} content={content} setContent={setContent} />

        <button type="button" onClick={writeSubmit}>
          등록
        </button>
      </form>
    </div>
  );
}

export default GalleryWrite;
