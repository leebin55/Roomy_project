import { React, useState } from "react";
import QuillEditor from "./QuillEditor";
import QuillToolbar from "./QuillToolbar";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const writeSubmit = async () => {
    alert("hi");
    await fetch("http://localhost:8080/room/board/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        boardTitle: title,
        boardContent: content,
        boardCode: 2,
      }),
    });
  };

  return (
    <>
      <input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <QuillToolbar toolbarId={"qb"} />
      <QuillEditor toolbarId={"qb"} content={content} setContent={setContent} />
      <button type="button" onClick={() => writeSubmit()}>
        등록
      </button>
    </>
  );
}

export default BoardWrite;
