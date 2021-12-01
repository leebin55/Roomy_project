import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import GallerySingle from './GallerySingle';

function GalleryMain() {
  const [galleryList, setGalleryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    viewGalleryList();
  }, []);

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
      <div className="gallery-btns">
        <button>
          <DeleteIcon />
          삭제
        </button>
        <button
          onClick={() => {
            navigate('/room/gallery/write');
          }}
        >
          <CreateIcon />
          글쓰기
        </button>
      </div>
      <div className="gallery-list">
        {galleryList.map((gallery) => {
          return <GallerySingle gallery={gallery} />;
        })}
      </div>
    </div>
  );
}

export default GalleryMain;
