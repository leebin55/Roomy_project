import { React, useState, useRef, useEffect } from 'react';
import QuillEditor from './QuillEditor';
import QuillToolbar from './QuillToolbar';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/Board.css';

function BoardWrite({ upData }) {
  const navigate = useNavigate();
  const [select, setSelect] = useState('0');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const boardTitle = useRef();
  const { userId } = useParams();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const selectHandler = (e) => {
    setSelect(e.target.value);
  };

  const writeSubmit = async () => {
    if (title.trim() === '') {
      alert('제목을 입력하세요');
      boardTitle.current.focus();
      return;
    } else if (content.trim() === '') {
      alert('내용을 입력하세요');
      return;
    }

    if (upData != null) {
      await fetch(`http://localhost:8080/room/${userId}/board`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardSeq: upData.boardSeq,
          boardUserId: upData.boardUserId,
          boardTitle: title,
          boardContent: content,
          boardCreateAt: upData.boardCreateAt,
          boardPrivate: select,
          boardLike: upData.boardLike,
          boardCode: upData.boardCode,
          boardHit: upData.boardHit,
        }),
      }).then((res) => {
        if (res?.ok) {
          navigate(`/room/${userId}/board`);
        }
      });
    } else {
      await fetch(`http://localhost:8080/room/${userId}/board`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardTitle: title,
          boardContent: content,
          boardPrivate: select,
          boardCode: 2,
        }),
      });
      navigate(`/room/${userId}/board`);
    }
  };

  const updating = () => {
    setTitle(upData.boardTitle);
    setContent(upData.boardContent);
    setSelect(upData.boardPrivate);
  };

  useEffect(() => {
    if (upData) {
      updating();
    }
  }, []);

  return (
    <div className="board-write-container">
      <div className="board-write-header">
        <select
          className="board-write-select"
          onChange={selectHandler}
          value={select}
        >
          <option value="0">전체공개</option>
          <option value="2">친구공개</option>
          <option value="1">비공개</option>
        </select>
        <input
          className="board-write-title"
          ref={boardTitle}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div className="board-write-content">
        <QuillToolbar toolbarId={'qb'} />
        <QuillEditor
          toolbarId={'qb'}
          content={content}
          setContent={setContent}
        />
      </div>
      <button type="button" onClick={() => writeSubmit()}>
        등록
      </button>
    </div>
  );
}

export default BoardWrite;
