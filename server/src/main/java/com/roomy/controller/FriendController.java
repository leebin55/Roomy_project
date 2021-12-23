package com.roomy.controller;

import com.roomy.dto.CheckFollowDTO;
import com.roomy.dto.SessionDTO;
import com.roomy.model.FollowVO;
import com.roomy.model.UserVO;
import com.roomy.service.FriendService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
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
    @GetMapping("/{roomUserId}/checkfollow")
    public CheckFollowDTO checkFollow(HttpSession session,
                                      @PathVariable("roomUserId")String roomUserId){
        // true : tbl_follow에 데이터 존재 > userId가 checkUserId를 팔로우한 상태
        // false : 데이터 없음 > 팔로우 안한 상태
        // loggedUser 가 follow 주체( 로그인한 회원(loggedUser) 과 해당 룸 회원 아이디(roomUserId) 비교 )
        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
        String loggedUserId = sessionDTO.getUserId();
        log.debug("checkFollow :{}", friendService.checkFollowAndUser(loggedUserId,roomUserId));
       return friendService.checkFollowAndUser(loggedUserId, roomUserId);

    }


    // 해당 회원의 follow 조회(userId 만 리턴)
    @GetMapping("/follow/{roomUserId}")
    public List<String> getFollowList( @PathVariable("roomUserId")String roomUserId){

        List<String> followList = friendService.findAllFollow(roomUserId);
        log.debug("follow 리스트 조회 : {}",followList.toString());
        return followList;
    }

    // 해당 회원의 follow 조회=> user 정보까지 같이 리턴
    @GetMapping("/follow/userInfo/{userId}")
    public List<UserVO> getFollowListWithUserInfo(@PathVariable("userId")String userId){

        List<UserVO> userInfoList = friendService.findAllFollowWithUserInfo(userId);
        log.debug("follow list with userInfo : {}",userInfoList.toString() );
        return userInfoList;
    }

    // 해당 회원의 follower 조회(userId 만 리턴)
    @GetMapping("/follower/{roomUserId}")
    public List<String> getFollowerList(@PathVariable("roomUserId")String roomUserId){
        List<String> followerList = friendService.findAllFollower(roomUserId);
        log.debug("follower 리스트 조회 : {}",followerList.toString());
        return followerList;
    }

    // 해당 회원의 follower 조회 => user 정보까지 같이 리턴
    @GetMapping("/follower/userInfo/{roomUserId}")
    public List<UserVO> getFollowerListWithUserInfo(@PathVariable("roomUserId")String roomUserId){

        List<UserVO> userInfoList = friendService.findAllFollowerWithUserInfo(roomUserId);
        log.debug("follower list with userInfo : {}",userInfoList.toString() );
        return userInfoList;
    }
    // Follow
    @PostMapping("/follow")
    public void follow(HttpSession session, @RequestBody FollowVO follow){
        // String 으로 followUserId만 받으면 follow 실행 : {"followUserId":"testId"}
        // Session 에서 로그인한 User가져오고 follow의 userId 에 set
        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
        String loggedUserId = sessionDTO.getUserId();
        log.debug("follow 실행 : {}",follow.toString());
        follow.setUserId(loggedUserId);
        friendService.followFriend(follow);
    }

    // Unfollow
    @DeleteMapping("/unfollow")
    public void  Unfollow(HttpSession session,@RequestBody FollowVO follow){
        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
        String loggedUserId = sessionDTO.getUserId();
        follow.setUserId(loggedUserId);
        log.debug("unfollow 실행 : {}",follow.toString());
        friendService.unfollowFriend(follow);
    }
}
