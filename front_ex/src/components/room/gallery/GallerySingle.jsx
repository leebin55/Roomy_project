import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GallerySingle({ gallery, index }) {
  const [isLike, setIsLike] = useState(false);

  const likeClick = (event) => {
    setIsLike(!isLike);
  };
  const clickImg = (event) => {
    axios
      .get(`http://localhost:8080/room/gallery?board_seq=${event.target.alt}`)
      .then((res) => {
        if (res.data === "ok") {
        }
      });
  };
  return (
    <ImageListItem key={gallery.board_seq}>
      <img
        // src={`${item.img}?w=248&fit=crop&auto=format`}
        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        // alt={item.title}
        // loading="lazy"
        alt={gallery.board_seq}
        onClick={clickImg}
      />
      <ImageListItemBar
        title={gallery.board_title}
        subtitle={<span>by: {gallery.board_create_at}</span>}
        position="below"
      />
      <span onClick={likeClick}>
        {isLike ? (
          <FavoriteIcon className="gallery-like" />
        ) : (
          <FavoriteBorderIcon className="gallery-like" />
        )}
        {gallery.board_like}
      </span>
    </ImageListItem>
  );
}

export default GallerySingle;
