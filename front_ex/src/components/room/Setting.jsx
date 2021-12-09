import React from 'react';
import TextField from '@mui/material/TextField';

function Setting() {
  return (
    <div>
      <h1>설정</h1>
      <div>
        <div>
          <p>사진</p>
        </div>
        <TextField
          id="room-name"
          defaultValue="Room의 이름"
          helperText="Room의 이름"
          margin="normal"
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={10}
          defaultValue="Room 소개글"
          helperText="Room 소개글"
          margin="normal"
          fullWidth="true"
        />
      </div>
      <button>수정</button>
    </div>
  );
}

export default Setting;
