import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateIcon from "@mui/icons-material/Create";

function GalleryMain() {
  const [galleryList, setGalleryList] = useState([]);

  useEffect(() => {
    viewGalleryList();
  }, []);

  const viewGalleryList = async () => {
    try {
      await axios.get(`http://localhost:8080/room/gallery`).then((res) => {
        console.log(res.data);
      }); //end then
    } catch (error) {
      // end try
      throw error;
    } //end catch
  }; // end viewGalleryList;

  return (
    <div>
      <div className="gallery-list"></div>
      <div className="gallery-btns">
        <button>삭제</button>
        <button>
          <CreateIcon />
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default GalleryMain;
