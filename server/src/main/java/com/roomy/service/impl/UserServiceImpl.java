package com.roomy.service.impl;

import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import com.roomy.service.FileService;
import com.roomy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
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
        // 받아온 user를 그대로 사용하면
        // Duplicate entry '' for key 'tbl_user.PRIMARY' 오류가 난다 > 다시 안남...
        // 그래서 user를 받아오고 userId 를 조회한 findUser에 받아온 값을 집어넣고
        // 다시 save
        //user에서 받아온 값을 save하면 다른 성별, 패스워드 등이 null으로 담김 아니면 front에서 다 세팅해서
        // 넘겨줘야 함
        User findUser = userRepository.findById(user.getUserId()).get();
        findUser.setUserName(user.getUserName());
        findUser.setUserEmail(user.getUserEmail());
        if (user.getUserProfile() != null && user.getUserProfile() != findUser.getUserProfile()) {
            findUser.setUserProfile(user.getUserProfile());
        }
        if (user.getUserPassword() != null) {
            findUser.setUserPassword(user.getUserPassword());
        }
        userRepository.save(findUser);
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
    public Optional<User> updatePassword(String userId, String userPassword) {
        Optional<User> _member = userRepository.findById(userId);
        _member.ifPresent(member->{
            member.setUserPassword(bCryptPasswordEncoder.encode(userPassword));
            userRepository.save(member);
        });
//        _member.ifPresent(member->{
//            member.setUserPassword(bCryptPasswordEncoder.encode(userPassword));
//            userRepository.save(member);
//        });
        return _member;
    }
}