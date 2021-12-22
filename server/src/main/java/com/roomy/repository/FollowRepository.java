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

    void deleteByUserIdAndFollowUserId(String userId, String followUserId);

    // 로그인한 유저(userId) 가 확인하고 싶은 유저(followUserId) 를 follow했는지 확인
    // 데이터 없으면 follow 하지않은 상태
    boolean existsByUserIdAndAndFollowUserId(String userId, String followUserId);
    

}
