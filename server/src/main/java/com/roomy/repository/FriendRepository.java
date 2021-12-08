package com.roomy.repository;

import com.roomy.model.FriendVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<FriendVO,Long> {

    // 회원 번호를 받아 친구 번호만 리스트로 리턴
    @Query (value = "select friendUserSeq from FriendVO where userSeq=:userSeq ")
    List<Long> findFriendList(@Param(value="userSeq") Long userSeq);
}
