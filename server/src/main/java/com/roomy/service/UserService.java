package com.roomy.service;


import com.roomy.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends GenericService<User, String>{

    public Optional<User> findByUserName(String userName, String userBirth);

}
