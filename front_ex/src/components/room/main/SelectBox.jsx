import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 5; // 각 메뉴 하나의 패딩
const MenuProps = {
  // select 박스의 메뉴 설정
  PaperProps: {
    style: {
      // select box 메뉴의 최대 높이
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

export default function SelectBox({ selectBoxMenu }) {
  //const theme = useTheme();
  const [followUserId, setFollowUserId] = useState('');

  const handleChange = (event) => {
    setFollowUserId(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 210 }}>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={followUserId}
          onChange={handleChange}
          input={<OutlinedInput sx={{ height: 40 }} />}
          MenuProps={MenuProps}
        >
          {selectBoxMenu.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
