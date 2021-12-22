package com.roomy.controller;

import com.roomy.model.FollowVO;
import com.roomy.service.FriendService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/friend")
public class FriendController {

    private final FriendService friendService;

    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }


    // userId 가 또다른 회원 checkUserId 를 follow 했는지 확인
    @GetMapping("/{checkUserId}/checkfollow")
    public Boolean checkFollow(@PathVariable("checkUserId") String checkUserId,
                               @RequestParam String userId){
        // true : tbl_follow에 데이터 존재 > userId가 checkUserId를 팔로우한 상태
        // false : 데이터 없음 > 팔로우 안한 상태
        // userId 가 follow 주체( 로그인한 회원(userId) 과 해당 룸 회원 아이디(checkUserId) 비교 )

        boolean result = friendService.checkFollow(userId,checkUserId);
        log.debug("follow 체크 실행 {}", result);
        return result;
    }

    // 해당 회원의 follow 조회
    @GetMapping("/follow/{userId}")
    public List<String> getFollowList(@PathVariable("userId")String userId){
        List<String> followList = friendService.findAllFollow(userId);
        log.debug("follow 리스트 조회 : {}",followList.toString());
        return followList;
    }

    // 해당 회원의 follower 조회
    @GetMapping("/follower/{userId}")
    public List<String> getFollowerList(@PathVariable("userId")String userId){
        List<String> followerList = friendService.findAllFollower(userId);
        log.debug("follower 리스트 조회 : {}",followerList.toString());
        return followerList;
    }
    // Follow
    @PostMapping("/follow")
    public void follow(@RequestBody FollowVO follow){
        log.debug("follow 실행 : {}",follow.toString());
        friendService.followFriend(follow);
    }

    // Unfollow
    @DeleteMapping("/unfollow")
    public void  Unfollow(@RequestBody FollowVO follow){
        log.debug("unfollow 실행 : {}",follow.toString());
        friendService.unfollowFriend(follow);
    }
}
