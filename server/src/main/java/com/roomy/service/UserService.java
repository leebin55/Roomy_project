package com.roomy.service;


import com.roomy.model.UserVO;

import java.util.Optional;

public interface UserService extends GenericService<UserVO, String>{

    public Optional<UserVO> findByUserName(String userName, String userBirth);
    public Optional<UserVO> findByUserPw(String userName, String userId);
    public Optional<UserVO> updatePassword(String userId, String userPassword);
}