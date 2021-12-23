import React, { useEffect, useState } from 'react';
import '../../css/LeftSide.css';
import axiosInstance from '../../utils/AxiosInstance';
import SelectBox from './main/SelectBox';
import { useParams } from 'react-router-dom';

function LeftSide({ roomData, userInfo }) {
  // select Box (follow 가 기본값으로 설정)> followSelect 가 false면 follower가 select
  const [followSelect, setFollowSelect] = useState('true');
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [selectBoxMenu, setSelectBoxMenu] = useState([]); // selectBox Menu List
  /** userInfo를 넘겨 받지만 처음 랜더링 할때는 userInfo에 아직 값이 안담겨 있음 > LeftSide의 return 문에서는 사용가능
   * 그전에는 아직 값이 안담겨 있음> userParam을 이용해서 가져옴
   */
  //   const userId = userInfo.userId;
  const { userId } = useParams();

  //selectBox 위의 follow 나 follwer 버튼 클릭
  const selectBtnClick = (event) => {
    const btnValue = event.target.value;
    console.log(event.target.value);
    // followSelect 가 false 가 아닐때 (follow로 설정되어 있을때)follower 버튼 클릭
    if (followSelect !== false && btnValue === 'follower') {
      console.log('follower실행');
      setSelectBoxMenu(followerList);
      setFollowSelect(false);
      return;
    }
    if (followSelect === false && btnValue === 'follow') {
      //followSelect 가 false 일때 follow 버튼 클릭(followSelect가 true일때 누르면 원래 followList가 selectMenu이므로 변화 없게)
      setSelectBoxMenu(followList);
      setFollowSelect(true);
      return;
    }
  };
  //follow list  조회
  const getFollowList = () => axiosInstance.get(`/friend/follow/${userId}`);

  // follower list 조회
  const getFollowerList = () => axiosInstance.get(`/friend/follower/${userId}`);

  useEffect(() => {
    // 랜더링 할때 followList,follower List 부름 > 친구 추가는 데이터 가 많이 바뀌지 않기때문에 처음에 한번만 부름
    Promise.all([getFollowList(), getFollowerList()]).then((res) => {
      setFollowList(res[0].data);
      setFollowerList(res[1].data);
      // selectBox 처음 기본은 follow 회원 리스트로 세팅
      setSelectBoxMenu(res[0].data);
    });
  }, []);

  return (
    <div className="leftside-container">
      <div className="leftside-profile-container">
        {userInfo.userProfile ? (
          <>
            <img src={userInfo.userProfile} alt="user_profile" />
          </>
        ) : (
          <>
            <img src="/img/default_profile.png" alt="default_user_profile" />
          </>
        )}
      </div>
      <div className="leftside-room-intro">
        <p>{roomData.roomIntroduce}</p>
      </div>
      <div className="leftside-room-username">
        <h3>{userInfo.userName} 님</h3>
      </div>
      <div className="leftside-room-friend-select">
        <div className="leftside-room-friend-select-btns">
          <button
            id={followSelect ? 'select-btn-active' : ''}
            onClick={selectBtnClick}
            value="follow"
          >
            follow
          </button>
          <button
            id={followSelect ? '' : 'select-btn-active'}
            onClick={selectBtnClick}
            value="follower"
          >
            follower
          </button>
        </div>
        <SelectBox selectBoxMenu={selectBoxMenu} />
      </div>
    </div>
  );
}

export default LeftSide;
