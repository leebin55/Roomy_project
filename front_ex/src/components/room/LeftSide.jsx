import React from 'react';
import '../../css/LeftSide.css';

function LeftSide({ roomData, userInfo }) {
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
    </div>
  );
}

export default LeftSide;
