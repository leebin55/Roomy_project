import React from "react";
import GalleryList from "./gallery/GalleryList";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import "../../css/Gallery.css";

function Gallery(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>갤러리</h1>
      <div className="gallery-btns">
        <button
          onClick={() => {
            navigate("/room/gallery/write");
          }}
        >
          <CreateIcon />
          글쓰기
        </button>
      </div>
      <GalleryList />
    </div>
  );
}

export default Gallery;
