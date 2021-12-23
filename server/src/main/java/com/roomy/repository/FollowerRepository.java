package com.roomy.repository;


import com.roomy.model.FollowerVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowerRepository extends JpaRepository<FollowerVO,String> {

    // 해당 회원의 팔로우한 회원아이디만 리스트로 리턴
    @Query(value = "select f.followerUserId from FollowerVO f where f.userId=:userId ")
    List<String> findFollowerListByUserId(@Param(value="userId") String userId);

    void deleteByFollowerUserIdAndUserId(String followerUserId, String userId);
}
