package com.roomy.service.impl;

import com.roomy.model.FollowVO;
import com.roomy.model.FollowerVO;
import com.roomy.repository.FollowRepository;
import com.roomy.repository.FollowerRepository;
import com.roomy.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class FriendServiceImpl implements FriendService {

    private final FollowRepository followRepository;
    private final FollowerRepository followerRepository;

    public FriendServiceImpl(FollowRepository followRepository, FollowerRepository followerRepository) {
        this.followRepository = followRepository;
        this.followerRepository = followerRepository;
    }

    // 팔로우 (친구추가)
    // tbl_follow : 내가 친구 추가한 회원 데이터 테이블
    // tbl_follower : 나를 친구 추가한 회원 데이터 테이블 ( 누가 나를 팔로우 했나 알기 위해)
    @Override
    public void followFriend(FollowVO follow) {
        // 팔로우를 하면 follow에 데이터 추가 그리고 follower 테이블에도 추가
        // A 가 B 를 follow =>  회원 A는 팔로우가 추가 / 회원 B 는 팔로워가 추가 (서로 반대로 저장)
        // tbl_follow => userId : A  followUserId : B
        // tbl_follower => userId : B  followerUserId : A
        followRepository.save(follow);
        
        FollowerVO followedByUser = new FollowerVO();
        followedByUser.setUserId(follow.getFollowUserId());
        followedByUser.setFollowerUserId(follow.getUserId());
        followerRepository.save(followedByUser);

    }

    // unFollow
    @Override
    public void unFollowFriend(FollowVO followVO) {


    }

    // 팔로우 조회 (내가 친구추가한 )
    @Override
    public List<String> findAllFollow(String userId) {
       return  followRepository.findFollowList(userId);
    }

    // 팔로워 조회 (나를 친구추가한)
    @Override
    public List<String> findAllFollower(String userId) {
        return followerRepository.findFollowerList(userId);
    }
}