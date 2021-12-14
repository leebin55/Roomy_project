package com.roomy.controller;

import com.roomy.model.BoardImageVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {

    @GetMapping( {"/",""})
    public String Main(){
        return "Main Page";
    }

    // 첫 메인화면 들어가면  최신 갤러리 공개글 10개보여주기
    @GetMapping("/Feed")
    public List<BoardImageVO> recentFeed(){


        return null;
    }


}
