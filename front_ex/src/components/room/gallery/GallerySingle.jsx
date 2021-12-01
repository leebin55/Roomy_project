import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function GallerySingle({ gallery }) {
  const [isLike, setIsLike] = useState(false);

  const likeClick = (event) => {
    event.preventDefault();
    setIsLike(!isLike);
  };
  return (
    <div className="gallery-list" key={gallery.board_seq}>
      <div>
        <input type="checkbox" />
        <h3>{gallery.board_title}</h3>
        <p>{gallery.board_create_at}</p>
      </div>
      <p>{gallery.board_content}</p>
      <div>
        <span onClick={likeClick}>
          {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          {gallery.board_like}
        </span>
      </div>
    </div>
  );
}

export default GallerySingle;
