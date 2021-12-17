package com.roomy.service.impl;

import com.roomy.model.FriendVO;
import com.roomy.repository.FriendRepository;
import com.roomy.service.FriendService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;

    public FriendServiceImpl(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }


    @Override
    public void followFriend(FriendVO friendVO) {

        friendRepository.save(friendVO);
    }

    @Override
    public void unFollowFriend(String friend_id) {

        friendRepository.deleteById(friend_id);
    }

    // 회원 번호를 받아 친구회원 번호만 출력
    @Override
    public List<Long> friendList(String user_id) {

        List<Long> friendsList = friendRepository.findFriendList(user_id);

        return friendsList;
    }
}
