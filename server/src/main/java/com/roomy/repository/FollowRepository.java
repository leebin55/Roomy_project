package com.roomy.repository;

import com.roomy.model.FollowVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<FollowVO,String> {

    // 해당 회원의 팔로우한 회원아이디만 리스트로 리턴
    @Query (value = "select followUserId from FollowVO where userId=:userId ")
    List<String> findFollowList(@Param(value="userId") String userId);


}
