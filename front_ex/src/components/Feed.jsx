import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Feed({ gallery, index }) {
  const [heartClicked, setHeartClicked] = React.useState(false);

  const heartClickedEvent = () => {
    alert('clicked');
    setHeartClicked(!heartClicked);
  };

  return (
    <div className="feed-card">
      <Card sx={{ width: 600 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={gallery.boardTitle}
        />
        <CardMedia
          component="img"
          height="400"
          image={gallery.imgURL[0]}
          alt={gallery.boardTitle}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {gallery.boardCreateAt}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={heartClickedEvent}>
            {heartClicked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
