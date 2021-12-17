package com.roomy.service;

import com.roomy.model.FriendVO;


import java.util.List;

public interface FriendService {
    
    // 친구 추가
    void followFriend(FriendVO friendVO);
    
    // 친구 삭제
    void unFollowFriend(String friend_id);
    
    // 친구 조회 (친구 번호 리턴)
    List<Long> friendList(String user_id);
    
}
