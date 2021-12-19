package com.roomy.service.impl;

import com.roomy.model.User;
import com.roomy.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplV1 implements UserService {


    @Override
    public List<User> selectAll() {
        return null;
    }

    @Override
    public User findById(String s) {
        return null;
    }

    @Override
    public void insert(User user) {

    }

    @Override
    public void update(User user) {

    }

    @Override
    public void delete(String s) {

    }

    @Override
    public Optional<User> findByUserName(String userName, String userBirth) {
        return Optional.empty();
    }
}
