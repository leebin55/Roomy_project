import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GalleryWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  const writeSubmit = async () => {
    if (title.trim() !== '' && content.trim() !== '') {
      try {
        await axios
          .post('http://localhost:8080/room/gallery/write', {
            board_user_seq: 1,
            board_title: title,
            board_content: content,
            board_create_at: moment().format('YYYY-MM-DD HH:mm'),
            board_code: 1,
          })
          .then((res) => {
            if (res.data === 'ok') {
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
        <input name="board_content" value={content} onChange={contentChange} />
        <button type="button" onClick={writeSubmit}>
          등록
        </button>
      </form>
    </div>
  );
}

export default GalleryWrite;
