package com.roomy.service.impl;

import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import com.roomy.service.FileService;
import com.roomy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service("userService")
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


    @Override
    public Optional<User> findByUserName(String userName, String userBirth) {
        //List<User> member = userRepository.findByUserNameAndUserBirth(user.getUserName(), user.getUserBirth());

        // Optional로 input에 적은 username, userbirth 가져와서 2개 데이터가 일치한것만 보여줌 아니면 정보 없음임
        // db에 저장된게  username과 userbirth 둘다 일치해야 뜸 아니면 정보없음 임
        Optional<User> member = Optional.ofNullable(userRepository.findByUserNameAndUserBirth(userName, userBirth)
                .orElseThrow(() -> new IllegalArgumentException("정보 없음")));

        return member;
    }
}
