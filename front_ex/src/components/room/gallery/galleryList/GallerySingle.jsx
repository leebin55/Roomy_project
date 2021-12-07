import React, { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useNavigate } from 'react-router-dom';
// import { useGalleryContext } from '../../../../context/GalleryContextProvider';
import axios from 'axios';

function GallerySingle({ gallery, index }) {
  const navigate = useNavigate();

  const [isLike, setIsLike] = useState(false);
  // 좋아요 수 ( 하트를 클릭 하면 바로 좋아요수도 바뀌기 때문에 따로 변수 만듬)
  const [likeNum, setLikeNum] = useState('');

  //화면이 실행될 때 likeNum에 gallery.boardLike 값으로
  useEffect(() => {
    setLikeNum(gallery.boardLike);
  }, []);

  /*
  // 유저가 이전에 하트를 눌렀는지 확인하고 보여줌
//   const beforeCheckHeart = async () => {
//     await axios
//       .put('http://localhost:8080/room/gallery/beforeCheck', {
//         userSeq: gallery.boardUserSeq,
//         boardSeq: gallery.boardSeq,
//       })
//       .then((res) => {
//         console.log(res.data);
//       });
//   };
*/
  //   const countLike = async () => {
  //     try {
  //       axios.get(
  //         `http:/localhost:8080/room/gallery/countLike/${gallery.boardSeq}`
  //       ).then((res)=>{
  // 		  if(res.status===200){

  // 		  }
  // 	  });
  //     } catch (error) {}
  //   };
  const likeClick = () => {
    setIsLike(!isLike);
    likeEvent();
  };

  // 하트를 클릭하면 서버에 user와 board seq 를 넘겨준다
  const likeEvent = async () => {
    try {
      axios
        .post('http://localhost:8080/room/gallery/like', {
          userSeq: gallery.boardUserSeq,
          boardSeq: gallery.boardSeq,
        })
        .then((res) => {
          // server에서 좋아요 Insert 혹은 delete하여 좋아요수 받아옴
          setLikeNum(res.data);
        });
    } catch (error) {
      throw error;
    }
  };
  // 사진을 클릭했을 때
  const clickImg = (event) => {
    navigate(`/room/gallery/${event.target.alt}`);
    // 원래 위에처럼  url로 이동하려고 했지만
    // 글을 수정할 때 Editor 에서 변수를 못가져와서
    // GalleryList  에서 Detail 부분을 부른다.
  };

  return (
    <ImageListItem key={index}>
      <img
        src={gallery.imgURL}
        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}

        alt={gallery.boardSeq}
        onClick={clickImg}
      />
      <ImageListItemBar
        title={gallery.boardTitle}
        subtitle={<span>by: {gallery.boardCreateAt}</span>}
        position="below"
      />
      <span onClick={likeClick}>
        {isLike ? (
          <FavoriteIcon className="gallery-like" />
        ) : (
          <FavoriteBorderIcon className="gallery-like" />
        )}
        {likeNum}
      </span>
    </ImageListItem>
  );
}

export default GallerySingle;