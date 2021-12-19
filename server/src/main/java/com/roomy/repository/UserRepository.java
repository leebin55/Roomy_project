package com.roomy.repository;

import com.roomy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    // userId 가 pk로 변경
    Optional<User> findByUserId(String userId);

}
