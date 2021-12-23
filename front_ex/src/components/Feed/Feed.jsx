import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axiosInstance from '../../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Feed({ gallery, index }) {
  const [heartClicked, setHeartClicked] = useState(false);
  // 하트를클릭하면 좋아요 수 표시
  const [likeNum, setLikeNum] = useState('');
  const navigate = useNavigate();

  const heartClickedEvent = () => {
    setHeartClicked(!heartClicked);
    try {
      axiosInstance
        .post(`/room/${gallery.boardUserId}/gallery/like`, {
          userId: gallery.boardUserId,
          boardSeq: gallery.boardSeq,
        })
        .then((res) => {
          setLikeNum(res.data);
        });
    } catch (error) {
      throw error;
    }
  };

  // 이미지 클릭하면 실행되는메서드
  const imageClick = (event) => {
    //alert(event.target.alt);
    const board_seq = event.target.alt;
    navigate(`/room/${gallery.boardUserId}/gallery/${board_seq}`);
  };
  return (
    <div className="feed-card">
      <Card sx={{ width: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ width: 50, height: 50 }} aria-label="recipe">
              <input
                type="image"
                src={gallery.imgURL[0]}
                alt="feed"
                style={{ width: '100%' }}
              />
            </Avatar>
          }
          title={gallery.boardTitle}
        />

        <CardMedia
          component="img"
          height="600"
          image={gallery.imgURL[0]}
          alt={gallery.boardSeq}
          onClick={imageClick}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {gallery.boardCreateAt}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={heartClickedEvent}>
            {heartClicked ? (
              <>
                <FavoriteIcon /> <span>{likeNum}</span>
              </>
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
