import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useGalleryContext } from '../../../context/GalleryContextProvider';

//--------- toolbar handlers --------------------
// Toolbar에서 작동하기 위한 redo , undo function
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

//글자 크기 선택
const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large'];
Quill.register(Size, true);

// 글자 폰트 선택
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia'];
Quill.register(Font, true);

// Quill editor 세팅을 위한 Formats
const formats = [
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

/////////////////////////////////////////////////////////////////////////

function Editor(props) {
	if(props.boardState==='update'){
		
	}
  const { content, setContent, setGalleryImg } = useGalleryContext();

  const quillRef = useRef();
  //useMemo 를 사용하여  modules 를 만들지 않느면
  // 랜더링 할때마다 modules 가 다시생성
  //image  버튼을 클릭하면 처리되는 핸들러
  const imageHandler = () => {
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

      if (file.size > 2097152) {
        alert('파일용량을 초과하였습니다.');
        return;
      }
      // console.log(file.size);
      // 이미지는  FormData 객체에 담아야됨
      const formData = new FormData();
      // FormData 는  key - value구조로 되어있음
      formData.append('img', file);
      try {
        await axios
          .put('http://localhost:8080/room/gallery/img', formData)
          .then((result) => {
            // server에서 이미지 url 받아오기 (또는 여기서 url로 바꿔서 server 에 넘겨준다)
            console.log(result.data);
            //이 url을 img 태그의 src에 넣은 요소을 현재 에디터의 커서에 넣어주기
            const img_url = result.data;
            setGalleryImg(img_url);
            // 현재 에디터 내에서 커서 위치값 가져오기
            const editor = quillRef.current.getEditor(); // 에디터 정보 가져오기
            const range = editor.getSelection(); // 현재 커서 위치
            //가져온 위치에 이미지 삽입 (에디터 특정 위치에 원하는 요소 넣어주기)
            editor.insertEmbed(range, 'image', img_url);
          });
      } catch (error) {
        alert('다시 시도해 주세요');
        throw error;
      }
    });
  };

  const modules = useMemo(
    () => ({
      // props > toolbarId 를 가져옴
      toolbar: {
        // toolbar: container 내가 에디터에서 사용할 툴바 목록을 설정toolbarId 로
        container: '#' + props.toolbarId,
        //toolbar: handlers
        // editor에게 처리를 맞기지 않고 직접 핸들러 함수를 만들어 처리
        // handlers를 사용하면 기존 해당 핸들러를 사용할 수 없다.
        handlers: {
          undo: undoChange,
          redo: redoChange,
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={content}
      onChange={(value) => {
        setContent(value);
      }}
      modules={modules}
      formats={formats}
      style={{ height: '350px' }}
    />
  );
}

export default Editor;
