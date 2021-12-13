package com.roomy.controller;


import com.roomy.config.jwt.JwtTokenProvider;
import com.roomy.model.User;
import com.roomy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Collections;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    // 회원가입
    // 뷰에서 정보넣고 회원가입하면 기능됨
    @PostMapping("/join")
    public Long join(@RequestBody Map<String, String> user){
        return userRepository.save(User.builder()
                .userId(user.get("userId"))
                .userPassword(bCryptPasswordEncoder.encode(user.get("password")))
                .userName(user.get("username"))
                .userEmail(user.get("email"))
                .userBirth(user.get("birth"))
                .userGender(user.get("gender"))
                .userName(user.get("username"))
                .roles(Collections.singletonList("ROLE_USER"))
                .build()).getId();
    }
    // 로그인
    // postman으로 하면 토큰생성된거 보이는데 좀더 공부해야함
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> user){
        User member = userRepository.findByUserId(user.get("userId"))
                .orElseThrow(()-> new IllegalArgumentException("가입되는 않은 userId"));
        if(!bCryptPasswordEncoder.matches(user.get("password"), member.getPassword())) {
            throw new IllegalArgumentException("비번 틀림");
        }
        System.out.println("로그인 ok");
        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }

    @PostMapping("/refresh")
    public String refreshLogin(){
        // 새로고침될때마다 useEffect에 fetch로 새로고침토큰을 발행할 예정임
        return "";
    }

}
