import React, { useState } from 'react';
import GalleryList from './gallery/GalleryList';

import CreateIcon from '@mui/icons-material/Create';
import '../../css/Gallery.css';
import GalleryWrite from './gallery/GalleryWrite';
import GalleryContextProvider from '../../context/GalleryContextProvider';

function Gallery(props) {
  const [isWrite, setIsWrite] = useState(false);
  return (
    <GalleryContextProvider>
      <h1>갤러리</h1>

      <div className="gallery-btns">
        {!isWrite ? (
          <div>
            <button
              onClick={() => {
                setIsWrite(!isWrite);
              }}
            >
              {' '}
              <CreateIcon />
              글쓰기
            </button>
            <GalleryList />
          </div>
        ) : (
          <GalleryWrite isWrite={isWrite} setIsWrite={setIsWrite} />
        )}
      </div>
    </GalleryContextProvider>
  );
}

export default Gallery;
