import React, { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

// const Size = Quill.import("formats/size");
// Size.whitelist = ["small", "medium", "large"];
// Quill.register(Size, true);

function Editor(props) {
  const modules = useMemo(
    () => ({
      // props > toolbarId 를 가져옴
      toolbar: {
        container: "#" + props.toolbarId,
      },
    }),
    []
  );

  const formats = [
    "font", //폰트
    "size", //글자크기
    "bold", // 굵은글씨
    "italic", //기울게
    "underline", //밑줄
    "align", // 정렬
    "background", //글자 바탕색
    "color", //글자 색깔
  ];

  return (
    <ReactQuill
      theme="snow"
      value={props.content}
      onChange={(value) => {
        props.setContent(value);
      }}
      modules={modules}
      formats={formats}
      style={{ height: "350px" }}
    />
  );
}

export default Editor;
