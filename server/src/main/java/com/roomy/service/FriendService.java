package com.roomy.service;

import com.roomy.dto.CheckFollowDTO;
import com.roomy.model.FollowVO;


import java.util.List;

public interface FriendService {


    // 팔로우 > 회원을 팔로우하면 tbl_follow와 tbl_follower 에 같이 insert
    void followFriend(FollowVO friendVO);
    
    // 회원 ID 와 unfollow할 회원 ID로 지우기
    // 언팔로우 >> 언팔하면  tbl_follower와 tbl_follow에 같이 delete
    void unfollowFriend(FollowVO followVO);
    
    // 내가 팔로우한 친구 조회 (팔로우한 회원 아이디만 리턴) => tbl_follow 데이터 모두조회
    List<String> findAllFollow(String userId);

    // 나를 팔로우한 친구 조회 (팔로워 회원 아이디 리턴)
    List<String> findAllFollower(String userId);

    // userId(로그인한 유저)가 checkFollowUserId (확인하고싶은 유저) 데이터가 있는지 확인
    // 있으면 follow상태 없으면 follow 안한 상태
    Boolean checkFollow(String userId, String checkFollowUserId);

    CheckFollowDTO checkFollowAndUser(String loggedUserId,String roomUserId);
}
