package com.roomy.repository;

import com.roomy.model.UserVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserVO, String> {


    // 아이디찾기에 쓸거임

    // List<User> findByUserNameAndUserBirth(String userName, String userBirth);
    Optional<UserVO> findByUserNameAndUserBirth(String userName, String userBirth);
    Optional<UserVO> findByUserNameAndUserId(String userName, String userId);

    //회원 아이디로 프로필 사진만 리턴

    @Query(value="select userProfile from UserVO where userId =:userId")
    String getProfileByUserId(@Param(value = "userId")String userId);


}

