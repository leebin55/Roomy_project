package com.roomy.repository;


import com.roomy.model.FollowerVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowerRepository extends JpaRepository<FollowerVO,String> {

    // 해당 회원의 팔로우한 회원아이디만 리스트로 리턴
    @Query(value = "select followerUserId from FollowerVO where userId=:userId ")
    List<String> findFollowerList(@Param(value="userId") String userId);

}
