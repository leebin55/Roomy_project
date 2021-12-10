import { height } from "@mui/system";
import React from "react";

export const QuillToolbar = (props) => {
  // Quill editor를 사용하기 위한 세팅

  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
          </span>
          <span className="ql-formats">
            <select className="ql-size">
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
        </div>
      )}
    </>
  );
};

export default QuillToolbar;
