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
    public void unFollowFriend(Long friend_seq) {

        friendRepository.deleteById(friend_seq);
    }

    // 회원 번호를 받아 친구회원 번호만 출력
    @Override
    public List<Long> friendList(Long user_seq) {

        List<Long> friendsList = friendRepository.findFriendList(user_seq);

        return friendsList;
    }
}
