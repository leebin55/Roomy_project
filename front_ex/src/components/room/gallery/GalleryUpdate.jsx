import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function GalleryUpdate({ galleryDetail, setGalleryDetail }) {
  return (
    <div>
      <div>
        <button>
          <ArrowBackIcon />
          뒤로
        </button>
        <button>
          <CheckCircleIcon />
          완료
        </button>
      </div>
    </div>
  );
}

export default GalleryUpdate;
