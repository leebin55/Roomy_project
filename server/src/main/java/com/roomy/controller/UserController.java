package com.roomy.controller;


import com.roomy.config.jwt.JwtProps;
import com.roomy.config.jwt.JwtTokenProvider;
import com.roomy.model.RoomVO;
import com.roomy.model.User;
import com.roomy.repository.RoomRepository;
import com.roomy.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room")
public class UserController {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final JwtTokenProvider jwtTokenProvider;



    // 회원가입
    // 뷰에서 정보넣고 회원가입하면 기능됨
    @PostMapping("/join")
    public String join(@RequestBody User user){
        user.setUser_rank(1);
        userRepository.save(user);

        // 회원가입하면 미니홈피도 생성되게
        RoomVO roomVO = RoomVO.builder().userId(user.getUserId()).roomName(user.getUsername() + "님의 미니홈피에 오신 걸 환영합니다").roomIntroduce("소개글이 없습니다").build();
        roomRepository.save(roomVO);

        log.debug("roomVO는 이렇게 생겼다 {}", roomVO.toString());

//        roomRepository.save();
        return user.getUserId();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> user, HttpSession session){
        User member = userRepository.findByUserId(user.get("userId"))
                .orElseThrow(()-> new IllegalArgumentException("가입되지 않은 userId"));
        if(!bCryptPasswordEncoder.matches(user.get("password"), member.getPassword())){
            throw new IllegalArgumentException("비번 틀림");
        }
        session.setAttribute("user", user);

        return ResponseEntity.status(200).body(user);
    }


    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.removeAttribute("user");
        return ResponseEntity.status(200).body("logout");
    }

    @PostMapping("/findByUsername")
    public String findByUsername(@PathVariable("seq") Long id,
            @RequestBody String username){

        userRepository.findById(id);

        return "";
    }

    @GetMapping("/mypage/{id}")
    public String update(@PathVariable("id") Long id){
        return "";
    }

    // 회원정보 수정
    @PutMapping("/update")
    public Long update(@RequestBody User user){
        log.debug("userupdate info : {}",user.toString());

        return null;
    }

    @GetMapping("/user/{userId}")
    public User getUserInfo(@PathVariable("userId") String userId){
        User user = userRepository.findByUserId(userId).get();
        log.debug("user 조회 : {}", user.toString());
        return user;
    }

    // 로그인
    // postman으로 하면 토큰생성된거 보이는데 좀더 공부해야함
//    @PostMapping("/login")
//    public String login(@RequestBody Map<String, String> user, HttpServletResponse response){
//        User member = userRepository.findByUserId(user.get("userId"))
//                .orElseThrow(()-> new IllegalArgumentException("가입되는 않은 userId"));
//        if(!bCryptPasswordEncoder.matches(user.get("password"), member.getPassword())) {
//            throw new IllegalArgumentException("비번 틀림");
//        }
//        System.out.println("로그인 ok");
//        String accessToken = "";
//        String refreshToken = "";
//        accessToken = jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
//        refreshToken =  jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
//        // 로그인 요청을 하면 토큰을 발급해주는데 새로고침이나 렌더링 다시되게 되면 state변수에 쿠키넣어둘건데 그거 없어지니까
//        // 쿠키안에다가 새로고침하면 바로 새로발급해줄 토큰을 넣어놓는거임
//        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
//        refreshCookie.setMaxAge(30 * 60);
//        response.addCookie(refreshCookie);
//        return accessToken;
//    }

    // 새로고침될때마다 useEffect에 fetch로 새로고침토큰을 발행할 예정임
//    @PostMapping("/refresh")
//    public String refreshLogin(@RequestBody Map<String, String> user,
//                               HttpServletResponse response,
//                               HttpServletRequest request){
//
//        User member = userRepository.findByUserId(user.get("userId"))
//                .orElseThrow(()-> new IllegalArgumentException("비정상 접근유저"));
//        if(!bCryptPasswordEncoder.matches(user.get("password"), member.getPassword())) {
//            throw new IllegalArgumentException("비정상 비번에러");
//        }
//        String accessToken = "";
//        String refreshToken = "";
//
//        Cookie[] cookies = request.getCookies();
//        if(cookies != null && cookies.length > 0) {
//            for(Cookie cookie : cookies) {
//                if(cookie.getName().equals("refreshToken")) {
//                    refreshToken = cookie.getValue();
//                    if(checkClaim(refreshToken)){
//                        accessToken = jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
//                    }
//                }
//            }
//        }
//        return accessToken;
//    }
//    public boolean checkClaim(String jwt) {
//        try {
//            Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(JwtProps.SECRET))
//                    .parseClaimsJws(jwt).getBody();
//            return true;
//        }catch (ExpiredJwtException e) {
//            log.error("Token Expired");
//            return false;
//        }catch(JwtException e) {
//            log.error("Token Error", e);
//            return false;
//        }
//    }

}
