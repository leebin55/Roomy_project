package com.roomy.controller;

import com.roomy.model.BoardImageVO;
import com.roomy.model.RoomVO;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class MainController {

    private final RoomService roomService;

    public MainController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping( {"/",""})
    public String Main(){
        return "Main Page";
    }

    // 첫 메인화면 들어가면  최신 갤러리 공개글 10개보여주기
    @GetMapping("/Feed")
    public List<BoardImageVO> recentFeed(){


        return null;
    }

    @GetMapping("/search")
    public List<RoomVO> search(@RequestParam String query, @RequestParam String select) {
        log.debug("미니홈피 search 컨트롤러 실행");
//        List<RoomVO> list =
        return null;
    }


}
