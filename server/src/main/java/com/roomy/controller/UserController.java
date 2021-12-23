package com.roomy.controller;



import com.roomy.dto.SessionDTO;
import com.roomy.model.RoomVO;
import com.roomy.model.UserVO;
import com.roomy.repository.RoomRepository;
import com.roomy.repository.UserRepository;

import com.roomy.service.FileService;


import com.roomy.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



import javax.servlet.http.HttpSession;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/user")
public class UserController {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final FileService fileService;// 프로필 사진 등록을 위해
    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final JwtTokenProvider jwtTokenProvider;



    // 회원가입
    // 뷰에서 정보넣고 회원가입하면 기능됨
    @PostMapping("/join")
    public void join(@RequestBody UserVO userVO){
        log.debug("join 컨트롤러 실행 {}", userVO.toString());
        userService.insert(userVO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpSession session, @RequestBody UserVO userVO){

        // RequestBody로 받아온 아이디를 검사
        UserVO member = userRepository.findById(userVO.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("가입되지 않은 userId"));
        // matches(입력된 비번, db에 저장되있는 비번) 비교해서 비번 맞추는거임
        if(!bCryptPasswordEncoder.matches(userVO.getUserPassword(), member.getUserPassword())) {
            throw new IllegalArgumentException("비번 틀림");
        }
        log.debug("로그인 컨트롤러 {}", userVO.toString());

        // 유저 id와 유저 이름만 담아둠
        SessionDTO sessionDTO = new SessionDTO();
        sessionDTO.setUserId(member.getUserId());
        sessionDTO.setUserName(member.getUserName());
        
        session.setAttribute("USER", sessionDTO);

        return ResponseEntity.status(200).body("하");
    }

    // 정상적인 사용자인지 확인 / 현재 로그인 중인 회원 정보 가져오기
    @PostMapping("/login-ok")
    public SessionDTO loginOk(HttpSession session) {
        log.debug("loginOK 컨트롤러 실행 {}", session.getAttribute("USER"));

        SessionDTO sessionDTO = (SessionDTO) session.getAttribute("USER");
        if(sessionDTO != null) {
            log.debug("세션 유저 {}", sessionDTO.toString());
        }
        return sessionDTO;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        log.debug("로그아웃 메서드 실행");
        session.removeAttribute("USER");
        return ResponseEntity.status(200).body("logout");
    }

    @GetMapping("/username/{userName}/birth/{userBirth}")
    public ResponseEntity<?> findByUsername(@PathVariable("userName") String userName,
                                            @PathVariable("userBirth") String userBirth){
        log.debug(userName);
        log.debug(userBirth);

        Optional<UserVO> member = userService.findByUserName(userName, userBirth);
        return ResponseEntity.status(200).body(member);
    }

    // 비번찾기인데 다른 사이트들 보니깐 비번은 찾는게 아니라 바꾸는거길래 그렇게 만듬
    @GetMapping("/username/{userName}/userid/{userId}")
    public Optional<UserVO> findByPw(@PathVariable("userName") String userName,
                                     @PathVariable("userId") String userId){
        Optional<UserVO> member = userService.findByUserPw(userName, userId);
        return member;
    }

    // findByPw가 통과하면 사용가능한 메서드
    @PutMapping("/userId/{userId}/update/{userPassword}")
    public ResponseEntity<?> updatePassword(@PathVariable("userId") String userId,
                                            @PathVariable("userPassword") String userPassword) {
        Optional<UserVO> member = userService.updatePassword(userId, userPassword);
        log.debug(member.toString());
        return ResponseEntity.status(200).body(member);
    }

    @GetMapping("/mypage/{id}")
    public String update(@PathVariable("id") Long id){
        return "";
    }

    // 프로필 사진 서버에 저장
    @PutMapping("/profile")
    public String profileUpdate(@RequestParam("profile") MultipartFile profile){
        log.debug("profile : {}",profile.getOriginalFilename());
        String newProfileName = fileService.uploadFile(profile);
        return  newProfileName;
    }
    // 회원정보 수정
    @PutMapping("/update")
    public void update(@RequestBody UserVO userVO){

        log.debug("User{}", userVO.toString());

        userService.update(userVO);
    }


    // 회원 아이디로 회원 정보 가져오기
    @GetMapping("/{userId}")
    public UserVO getUserInfo(@PathVariable("userId") String userId){
        UserVO userVO = userRepository.findById(userId).get();
        log.debug("user 조회 : {}", userVO.toString());
        return userVO;
    }

    // 회원아이디로 회원 프로필 사진만 가져오기
    @GetMapping("/profile/{userId}")
    public String getUserProfile(@PathVariable("userId") String userId){
        log.debug("프로필 조회 : {}", userRepository.getProfileByUserId(userId));
        return userRepository.getProfileByUserId(userId);

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