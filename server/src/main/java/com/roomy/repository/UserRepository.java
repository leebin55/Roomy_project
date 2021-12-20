package com.roomy.repository;

import com.roomy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUserId(String userId);
    // 아이디찾기에 쓸거임

    // List<User> findByUserNameAndUserBirth(String userName, String userBirth);
    Optional<User> findByUserNameAndUserBirth(String userName, String userBirth);
    Optional<User> findByUserNameAndUserId(String userName,String userId);

}

