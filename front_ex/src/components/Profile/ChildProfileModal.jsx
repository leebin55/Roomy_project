import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from 'axios';

// 모달창 스타일지정
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildProfileModal() {
  // 프로필 사진을 고르면 미리보기 위한 변수
  const [preview, setPreview] = useState();
  // 프로필사진 수정 버튼 클릭해서 모달창 띄우기 위한 변수
  const [openChild, setOpenChild] = useState(false);

  // childmodal
  const handleOpen = () => {
    setOpenChild(true);
  };
  // childmodal 닫기
  const handleClose = () => {
    setOpenChild(false);
  };
  // 사진을 선택할때
  const imgChange = (event) => {
    // input에서 파일을 한개를 선택하더라도 배열로 저장된다.
    console.log(event.target.files[0]);
    // input 에서 선택한 파일을 서버에 아직 올리지 않은 상태에서 미리보기 하기위해
    // URL.createObjectURL()에서 반환된 값을 img src 에 넘겨주면 미리보기 가능
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  // 등록 클릭 이벤트
  const register = (event) => {
    const result = window.confirm('등록하시겠습니까?');
    if (result) {
      try {
        axios.put('http://localhost:8080/room/update', {}).then((res) => {
          if (res.status === 200) {
            // handleClose();
          }
        });
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <button onClick={handleOpen}>프로필 이미지 등록</button>
      <Modal
        hideBackdrop
        open={openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <div className="profile-update-header">
            <h2 id="child-modal-title">프로필 사진</h2>
            <button onClick={handleClose}>
              <DisabledByDefaultIcon />
            </button>
          </div>
          <div id="child-modal-description">
            <input
              type="file"
              id="profile_img"
              name="profile_img"
              accept="image/png, image/jpeg image/jpg"
              onChange={imgChange}
            />
            <div className="profile-update-img-container">
              <img
                onLoad={() => URL.revokeObjectURL(preview)}
                src={preview || 'https://via.placeholder.com/250'}
                alt="img"
              />
            </div>
          </div>

          <button onClick={() => register}>등록</button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ChildProfileModal;
