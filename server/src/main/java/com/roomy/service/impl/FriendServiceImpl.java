package com.roomy.service.impl;

import com.roomy.dto.CheckFollowDTO;
import com.roomy.model.FollowVO;
import com.roomy.model.FollowerVO;
import com.roomy.model.UserVO;
import com.roomy.repository.FollowRepository;
import com.roomy.repository.FollowerRepository;
import com.roomy.repository.UserRepository;
import com.roomy.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FriendServiceImpl implements FriendService {

    private final FollowRepository followRepository;
    private final FollowerRepository followerRepository;
    private final UserRepository userRepository;

    public FriendServiceImpl(FollowRepository followRepository, FollowerRepository followerRepository, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.followerRepository = followerRepository;
        this.userRepository = userRepository;
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

        if(checkFollow(follow.getUserId(), follow.getFollowUserId()) == true){
            // 만약 테이블에 이미 데이터 존재하면 그냥 리턴
            return;
        }
        followRepository.save(follow);
        FollowerVO followedByUser = new FollowerVO();
        followedByUser.setUserId(follow.getFollowUserId());
        followedByUser.setFollowerUserId(follow.getUserId());
        followerRepository.save(followedByUser);

    }

    // unFollow
    @Override
    @Transactional
    public void unfollowFriend(FollowVO followVO) {
        // 친구를 끊으려고 하는 회원 아이디(userId)
        String userId = followVO.getUserId();
        // 친구 끊기는 회원 아이디 (unfollowUserId)
        String unfollowUserId = followVO.getFollowUserId();
        if(checkFollow(userId,unfollowUserId)== false){
            // 만약 이미 데이터가 없으면 그냥 리턴
            return;
        }
    followRepository.deleteByUserIdAndFollowUserId(userId, unfollowUserId);
    // 언팔된 친구의 팔로어 테이블에서 사라짐
    followerRepository.deleteByFollowerUserIdAndUserId(userId, unfollowUserId);
    }
//    select * from tbl_follow where userid= and followUserId=
//    select * form tbl_follower where userid and followerUserId=
    // delete where followSeq 실행

    // 팔로우 조회 (내가 친구추가한 )
    @Override
    public List<String> findAllFollow(String userId) {

        return  followRepository.findFollowListByUserId(userId);
    }

    // 팔로워 조회 (나를 친구추가한)
    @Override
    public List<String> findAllFollower(String userId) {
        return followerRepository.findFollowerListByUserId(userId);
    }

    @Override
    public Boolean checkFollow(String userId, String checkFollowUserId) {

            return followRepository.existsByUserIdAndAndFollowUserId(userId, checkFollowUserId);

    }

    @Override
    public CheckFollowDTO checkFollowAndUser(String loggedUser, String roomUserId){

        CheckFollowDTO checkDTO = new CheckFollowDTO();

        if(loggedUser.equals(roomUserId)){
            // userId == checkFollowUserId
            checkDTO.setSameUser(true);

        }else {
            // 서로 다른 회원일경우
            Boolean existResult = this.checkFollow(loggedUser,roomUserId);
            checkDTO.setSameUser(false);
            checkDTO.setCheckFollow(existResult);
        }
        return checkDTO;
    }

    @Override
    public List<UserVO> findAllFollowWithUserInfo(String roomUserId) {
        List<UserVO> userInfoList= new ArrayList<>();

        List<String> followUserIdList=this.findAllFollow(roomUserId);
        log.debug("followUserIdList : {}",followUserIdList.toString());
        for(String userId : followUserIdList){
            UserVO userInfo = new UserVO();
            userInfo=userRepository.findById(userId).get();
           userInfoList.add(userInfo);
        }

        return userInfoList;
    }

    @Override
    public List<UserVO> findAllFollowerWithUserInfo(String roomUserId) {
        List<UserVO> userInfoList= new ArrayList<>();

        List<String> followerUserIdList=this.findAllFollower(roomUserId);
        log.debug("followerUserIdList : {}",followerUserIdList.toString());
        for(String userId : followerUserIdList){
            UserVO userInfo = new UserVO();
            userInfo=userRepository.findById(userId).get();
            userInfoList.add(userInfo);
        }
        return userInfoList;
    }


}