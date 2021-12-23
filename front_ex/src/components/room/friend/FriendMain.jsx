import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/AxiosInstance';
import TableList from './TableList';
import { useParams } from 'react-router-dom';

function FriendMain() {
  const { userId } = useParams();
  // 처음 Friend 에 들어가면 followList를 기본으로 보이게 하기위해
  const [showFollowList, setShowFollowList] = useState(true);
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  //follow list  조회(user 정보와 함께)
  const getFollowUserList = () =>
    axiosInstance.get(`/friend/follow/userInfo/${userId}`);

  // follower list 조회(user 정보와 함께)
  const getFollowerUserList = () =>
    axiosInstance.get(`/friend/follower/userInfo/${userId}`);

  useEffect(() => {
    // 랜더링 할때 followList,follower List 부름 > 친구 추가는 데이터 가 많이 바뀌지 않기때문에 처음에 한번만 부름
    Promise.all([getFollowUserList(), getFollowerUserList()]).then((res) => {
      setFollowList(res[0].data);
      setFollowerList(res[1].data);
      console.log('follow list : ', res[0].data);
      console.log('follower list : ', res[1].data);
    });
  }, []);

  return (
    <div>
      <div className="friend-header">
        <h1>FOLLOWLIST</h1>
        <button>FOLLOWER 보기 </button>
      </div>
      <div className="friend-list-container">
        <TableList dataList={showFollowList ? followList : followerList} />
      </div>
    </div>
  );
}

export default FriendMain;
