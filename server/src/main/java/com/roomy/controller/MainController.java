package com.roomy.controller;

import com.roomy.model.BoardImageVO;
import com.roomy.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class MainController {

    @GetMapping( {"/",""})
    public String Main(HttpSession httpSession){

        User user = User.builder().userId("sy").userPassword("1234").userEmail("bviibb@naver.com").userGender("W").userBirth("1997-07-29").userName("최선영").build();
        httpSession.setAttribute("MEMBER",user);

        return "Main Page";
    }

    // 첫 메인화면 들어가면  최신 갤러리 공개글 10개보여주기
    @GetMapping("/Feed")
    public List<BoardImageVO> recentFeed(){


        return null;
    }


}
