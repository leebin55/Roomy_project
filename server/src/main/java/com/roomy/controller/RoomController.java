package com.roomy.controller;

import com.roomy.model.RoomVO;
import com.roomy.repository.RoomRepository;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/room")
public class RoomController {

    // room 관련 별다른 서비스 로직이 없어서  repository 바로사용
    private final RoomRepository roomRepository;

    private final RoomService roomService;

    public RoomController(RoomRepository roomRepository, RoomService roomService) {

        this.roomRepository = roomRepository;
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

    @PutMapping("/{userId}")
    public RoomVO update(@RequestBody RoomVO roomVO) {
        log.debug("room update 컨트롤러 실행 {}", roomVO);

        roomService.update(roomVO);
        return roomVO;
    }

//    // setting 게시판
//    room 메서드랑 같이 써도 될 듯
//    @GetMapping("/{userId}/setting")
//    public RoomVO setting(@PathVariable String userId) {
//        log.debug("setting 컨트롤러 실행");
//        RoomVO roomVO = roomService.findById(userId);
//        log.debug("setting roomVO {}")
//        return roomVO;
//    }
}
