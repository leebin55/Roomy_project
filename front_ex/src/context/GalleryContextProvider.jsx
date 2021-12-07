import React, { createContext, useContext, useState } from 'react';

//context 생성
const GalleryContext = createContext();

//Context 의 Store 에 보관된 정보들을 추출하기 위한 Hook함수 선언
export const useGalleryContext = () => useContext(GalleryContext);

//Provider 를 합성 패턴으로 선언하여 필요한 곳에서 끌어올려 사용할 수 있도록 함
const GalleryContextProvider = ({ children }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [galleryImg, setGalleryImg] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);
  const [isDetail, setIsDetail] = useState([false]);
  const [galleryList, setGalleryList] = useState([]);
  const [galleryInfo, setGalleryInfo] = useState({
    boardCode: '',
    boardContent: '',
    boardCreateAt: '',
    boardLike: '',
    boardPrivate: '',
    boardSeq: '',
    boardTitle: '',
    boardUpdateAt: '',
    boardUserSeq: '',
  });

  const propsData = {
    content,
    setContent,
    title,
    setTitle,
    galleryImg,
    setGalleryImg,
    isUpdate,
    setIsUpdate,
    galleryInfo,
    setGalleryInfo,
    isDetail,
    setIsDetail,
    galleryList,
    setGalleryList,
  };

  return (
    <GalleryContext.Provider value={propsData}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;
