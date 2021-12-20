package com.roomy.service;


import com.roomy.model.User;

import java.util.Optional;

public interface UserService extends GenericService<User, String>{

    public Optional<User> findByUserName(String userName, String userBirth);
    public Optional<User> findByUserPw(String userName, String userId);
    public Optional<User> updatePassword(String userId, String password);
}
