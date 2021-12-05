import axios from 'axios';
import React from 'react';
import { Quill } from 'react-quill';

// Quill editor를 사용하기 위한 세팅
//quill/assets/icons/undo.svg 에서 바로 이미지를 가져올수도 있지만 밑의 번호로도 가능
// 이전으로 버튼 커스텀
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// 앞으로 버튼 커스텀
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

//--------- toolbar handlers --------------------
// Toolbar에서 작동하기 위한 redo , undo function
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}
/*
이미지 직접처리하기 위해 
 => Quill editor를 사용하여 이미지를 저장할 때는 base64로 변경되어 
 <img src='base64어찌고 저찌고=이미지'/> 형식으로 저장 (엄청나게긴 문자열)
 따라서 base64가 아니라 URL로 변경하여서 이미지를 저장하기위해 따로 사용
 */

function imageHandler() {
  // 이미지를 저장할 Input type = file DOM
  const img_input = document.createElement('input');
  // 속성 지정
  // image 파일을 ㄹ보내기 위해 type을 file 로 지정
  img_input.setAttribute('type', 'file');
  // image로 된 파일만 받기 위해 지정
  img_input.setAttribute('accept', 'image/*');
  // editor의 toolbar의 이미지 버튼을 클릭하면 Input이 클릭 됨
  // input 의 파일 선택창이 나옴
  img_input.click();
  //img_input 에 변화가 생길때
  img_input.addEventListener('change', async () => {
    const file = img_input.files[0];
    console.log(file);
    // 이미지는  FormData 객체에 담아야됨
    const formData = new FormData();
    // FormData 는  key - value구조로 되어있음
    formData.append('img', file);
    try {
      await axios
        .post('http://localhost:8080/room/gallery/img', formData)
        .then((result) => {
          // server에서 이미지 url 받아오기 (또는 여기서 url로 바꿔서 server 에 넘겨준다)
          console.log(result.data);
          //이 url을 img 태그의 src에 넣은 요소을 현재 에디터의 커서에 넣어주기
          // const img_url = result.data.url;
          //혖재 커서 위치에 이미지를 삽입하고 커서 위치를 +1
        });
    } catch (error) {}
  });
}

//글자 크기 선택
const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large'];
Quill.register(Size, true);

// 글자 폰트 선택
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia'];
Quill.register(Font, true);

export const modules = (props) => ({
  // props > toolbarId 를 가져옴
  toolbar: {
    // toolbar: container 내가 에디터에서 사용할 툴바 목록을 설정
    container: '#' + props, //id 가 toolbarId인것
    //toolbar: handlers
    // editor에게 처리를 맞기지 않고 직접 핸들러 함수를 만들어 처리
    // handlers를 사용하면 기존 해당 핸들러를 사용할 수 없다.
    handlers: {
      undo: undoChange,
      redo: redoChange,
      // image: imageHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Quill editor 세팅을 위한 Formats
export const formats = [
  'font', //폰트
  'size', //글자크기
  'bold', // 굵은글씨
  'italic', //기울게
  'underline', //밑줄
  'align', // 정렬
  'background', //글자 바탕색
  'color', //글자 색깔
  'image', // 이미지
];

// toolbar 메뉴를 세팅
//Quill Toolbar component
export const QuillToolbar = (props) => {
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
            <select className="ql-font">
              <option value="arial"> Arial </option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
            </select>
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
          <span className="ql-formats">
            <button className="ql-image" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default QuillToolbar;
