package com.roomy.service.impl;

import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import com.roomy.service.FileService;
import com.roomy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl( UserRepository userRepository) {

        this.userRepository = userRepository;
    }

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
}
