import React, { useState, useEffect } from 'react';
import Feed from './Feed';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../css/Feeds.css';

// 개별 피드
function Feeds() {
  const [galleryList, setGalleryList] = useState([]);

  // 화면띄워질때 한번만 실행
  useEffect(() => {
    viewGalleryList();
  }, []);

  // server 에서 gallery 리스트를 가져옴
  const viewGalleryList = async () => {
    try {
      await axios.get(`http://localhost:8080/room/gallery`).then((res) => {
        console.log(res.data);
        setGalleryList(res.data);
      }); //end then
    } catch (error) {
      // end try
      throw error;
    } //end catch
  }; // end viewGalleryList;

  return (
    <div>
      <div className="search-box">
        <SearchIcon />
        <input placeholder="검색어를 입력하세요" />
      </div>
      {galleryList.map((gallery, index) => (
        <Feed gallery={gallery} index={index} />
      ))}
    </div>
  );
}

export default Feeds;
