import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import '../../css/userForm/ProfileUpdateModal.css';
import axios from 'axios';
import { IronTwoTone } from '@mui/icons-material';
// 우선 로그인부분 안되있어서 userId를 직접 testid 로 설정 > 나중에 수정

// 메인화면에서 프로필부분에 수정하기 버튼을 클릭하면 나타나는 모달창
function ProfileUpdateModal({ openUpdate, setOpenUpdate }) {
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // 프로필 사진을 고르면 미리보기 위한 변수
  const [preview, setPreview] = useState();
  const [userId, setUserId] = useState('');
  const [tempFile, setTempFile] = useState({}); // 프로필 파일 변경될때 임시로 담음

  const handleClose = () => {
    setOpenUpdate(false);
  };
  // 사진을 선택할때
  const imgChange = (event) => {
    // input에서 파일을 한개를 선택하더라도 배열로 저장된다.
    //  console.log(URL.createObjectURL(event.target.files[0]));
    // input 에서 선택한 파일을 서버에 아직 올리지 않은 상태에서 미리보기 하기위해
    // URL.createObjectURL()에서 반환된 값을 img src 에 넘겨주면 미리보기 가능
    setPreview(URL.createObjectURL(event.target.files[0]));

    const file = event.target.files[0];
    if (file.size > 2097152) {
      alert('파일용량을 초과하였습니다.');
      return;
    }
    setTempFile(file);
  };

  // 등록 클릭 이벤트
  const register = async () => {
    const result = window.confirm('등록하시겠습니까?');
    if (result) {
      try {
        // 사진을 변경하면 preview 값 변경 userProfile의 값과 다름
        // 사진을 변경하면 따로 프로핑 등록
        if (preview !== userProfile) {
          const formData = new FormData();
          //   console.log('temp : ', tempFile);
          formData.append('profile', tempFile);
          await axios
            // 우선 이름과 이메일 프로필만 항목만 넘김 > 나중에 비밀번호 할 예정
            .put('http://localhost:8080/user/profile', formData)
            .then((res) => {
              if (res.status === 200) {
                // 받아온 파일 이름을 받아서 UserProfile에 담음
                setUserProfile(res.data);
              }
            });
        }
        // 우선 이름과 이메일 프로필만 항목만 넘김 > 나중에 비밀번호 할 예정
        await axios
          .put('http://localhost:8080/user/update', {
            userId,
            userName,
            userEmail,
            userprofile: userProfile,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log('완료');
              alert('회원정보 수정');
              handleClose();
            }
          });
      } catch (error) {
        return error;
      }
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    minHeight: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 5,
    px: 4,
    pb: 3,
  };
  const textStyle = {
    width: 400,
    margin: 1,
  };
  const closeModal = () => {
    setOpenUpdate(true);
  };

  // localStorage 에서 userId 를 가져와 회원정보 가져옴
  const getUserInfo = async (userId) => {
    await axios.get(`http://localhost:8080/user/${userId}`).then((res) => {
      if (res.status === 200) {
        console.log('>> : ', userId);
        console.log('유저 가져오기', res);
        setUserEmail(res.data.userEmail);
        setUserName(res.data.userName);
        setUserProfile(res.data.userprofile);
        setPreview(res.data.userprofile);
      }
    });
  };

  useEffect(() => {
    const localUser = window.localStorage.getItem('user');
    const userId = 'testid';
    getUserInfo(userId);
  }, []);

  return (
    <div>
      <Modal
        open={openUpdate}
        onClose={closeModal}
        aria-labelledby="modal-update-title"
        aria-describedby="modal-update-description"
      >
        <Box sx={style}>
          <div className="profile-update-header">
            <h2 id="modal-update-title">회원정보 수정하기</h2>
            <button onClick={handleClose}>
              <DisabledByDefaultIcon />
            </button>
          </div>

          <Box
            component="form"
            sx={{ width: '25ch' }}
            noValidate
            autoComplete="off"
          >
            <div id="modal-update-description">
              <div>
                <input
                  type="file"
                  id="profile_img"
                  name="profile_img"
                  accept="image/png, image/jpeg image/jpg"
                  defaultValue={userProfile}
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
              <div className="profile-update-text-container">
                <TextField
                  id="filled-basic"
                  variant="filled"
                  value={userName}
                  sx={textStyle}
                  helperText="이름"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <TextField
                  id="filled-basic"
                  variant="filled"
                  value={userEmail}
                  sx={textStyle}
                  helperText="이메일"
                  onChange={(event) => {
                    setUserEmail(event.target.value);
                  }}
                />
                <TextField
                  id="filled-basic"
                  variant="filled"
                  sx={textStyle}
                  helperText="비밀번호"
                  type="password"
                />
                <TextField
                  id="filled-basic"
                  variant="filled"
                  sx={textStyle}
                  helperText="비밀번호확인"
                  type="password"
                />
              </div>
            </div>
          </Box>
          <button onClick={register}>등록</button>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileUpdateModal;
