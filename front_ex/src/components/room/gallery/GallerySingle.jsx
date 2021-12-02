import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GallerySingle({ gallery, index }) {
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();

  const likeClick = (event) => {
    setIsLike(!isLike);
    likeEvent();
  };
  // 하트를 클릭하면 서버에 user와 board seq 를 넘겨준다
  const likeEvent = async () => {
    try {
      axios
        .post('http://localhost:8080/room/gallery/like', {
          like_user_seq: 1,
          like_board_seq: 1,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      throw error;
    }
  };
  const clickImg = (event) => {
    navigate(`/room/gallery/${event.target.alt}`);
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
