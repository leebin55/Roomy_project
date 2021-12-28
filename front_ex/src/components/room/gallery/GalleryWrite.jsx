import React from 'react';
import moment from 'moment';
import axiosInstance from '../../../utils/AxiosInstance';
import Editor from './Editor';
import { useGalleryContext } from '../../../context/GalleryContextProvider';
import QuillToolbar from './QuillToolbar';

// 갤러리 글 등록하는 부분
function GalleryWrite({ isWrite, setIsWrite, userId }) {
  const {
    title,
    setTitle,
    content,
    setContent,
    galleryImgList,
    setGalleryImgList,
  } = useGalleryContext();

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const writeSubmit = async () => {
    // content 에 포함되어있는 img_url만 return
    const saveURL = galleryImgList.filter((gallery) =>
      content.includes(gallery)
    );
    // const saveImgList = galleryList.filter((img) => content.includes(img));
    // console.log(saveImgList);
    if (title.trim() !== '' && content.trim() !== '' && saveURL.length > 0) {
      try {
        await axiosInstance
          .post(`/room/${userId}/gallery`, {
            boardUserSeq: 1,
            boardTitle: title,
            boardContent: content,
            boardCreateAt: moment().format('YYYY-MM-DD HH:mm'),
            boardCode: 1,
            imgURL: saveURL, // content에 포함된 url 만 보내줌
            // 임시로 USERID 값 넣어서 보여주기
            boardUserId: userId,
          })
          .then((res) => {
            // console.log(galleryImgList);
            // console.log('save: ', saveURL);
            alert('글 등록 완료');
            setTitle('');
            setContent('');
            setGalleryImgList([]);
            setIsWrite(!isWrite);
            return;
          });
      } catch (error) {
        alert(error.response.data);
      }
    } //if end
    else {
      if (saveURL.length < 1) {
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
        <Editor toolbarId={'tg'} userId={userId} />
        <button type="button" onClick={writeSubmit}>
          등록
        </button>
      </form>
    </div>
  );
}

export default GalleryWrite;
