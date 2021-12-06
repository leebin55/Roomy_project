import { React, useState, useRef } from "react";
import QuillEditor from "./QuillEditor";
import QuillToolbar from "./QuillToolbar";
import { useNavigate } from "react-router-dom";
import "../../../css/Board.css";

function BoardWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const boardTitle = useRef();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const writeSubmit = async () => {
    if (title.trim() === "") {
      alert("제목을 입력하세요");
      boardTitle.current.focus();
      return;
    } else if (content.trim() === "") {
      alert("내용을 입력하세요");
      return;
    }
    await fetch("http://localhost:8080/room/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        boardTitle: title,
        boardContent: content,
        boardCode: 2,
      }),
    }).then((res) => {
      if (res?.ok) {
        navigate("/room/board");
      }
    });
  };

  return (
    <div className="board-write-container">
      <div className="board-write-header">
        <select name="choice">
          <option value="banana">전체공개</option>
          <option value="apple">친구공개</option>
          <option value="orange">비공개</option>
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
        <QuillToolbar toolbarId={"qb"} />
        <QuillEditor
          toolbarId={"qb"}
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
