package com.roomy.controller;

import com.roomy.model.FollowVO;
import com.roomy.model.RoomVO;
import com.roomy.service.FriendService;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/room")
public class RoomController {


    private final RoomService roomService;


    public RoomController(RoomService roomService) {


        this.roomService = roomService;

    }

    // /room/{userId} 로 해당 미니홈피 들어가면 room 에 대한 정보 불러오기 (소개글 등등)
    @GetMapping( "/{userId}")
    public RoomVO room(@PathVariable String userId){
        log.debug("room 컨트롤러 실행 {}", userId);

        RoomVO roomVO = roomService.findById(userId);
        log.debug("roomVO {}", roomVO.toString());
        return roomVO;
    }

    // 미니홈피 setting 게시판에서 수정버튼 클릭하면 실행
    @PutMapping("/{userId}")
    public RoomVO update(@RequestBody RoomVO roomVO) {
        log.debug("room update 컨트롤러 실행 {}", roomVO);

        roomService.update(roomVO);
        return roomVO;
    }





}
