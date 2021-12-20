package com.roomy.service.impl;

import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import com.roomy.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("userService")
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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

    // 비번찾기위한거
    @Override
    public Optional<User> findByUserPw(String userName, String userId) {
        Optional<User> member = Optional.ofNullable(userRepository.findByUserNameAndUserId(userName, userId)
                .orElseThrow(() -> new IllegalArgumentException("정보 없음")));

        return member;
    }

    @Override
    public Optional<User> updatePassword(String userId, String password) {
        Optional<User> _member = userRepository.findById(userId);
        if(!bCryptPasswordEncoder.matches(password, ))
        if(_member.isPresent()){
            User member = _member.get();
            member.setUserPassword(password);
            userRepository.save(member);
        }
        return _member;
    }
}
