package com.roomy.repository;

import com.roomy.model.FriendVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendRepository extends JpaRepository<FriendVO,String> {

    // 회원 번호를 받아 친구 번호만 리스트로 리턴
    @Query (value = "select friendUserId from FriendVO where userId=:userId ")
    List<Long> findFriendList(@Param(value="userId") String userId);
}
