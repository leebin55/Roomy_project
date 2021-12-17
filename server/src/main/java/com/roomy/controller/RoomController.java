package com.roomy.controller;

import com.roomy.model.RoomVO;
import com.roomy.repository.RoomRepository;
import com.roomy.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // /room/userId 로 해당 미니홈피 들어가서  room 에 대한 정보 불러오기 (소개글 등등등)
    @GetMapping( "/{userId}")
    public RoomVO room(@PathVariable String userId){
        log.debug("room 컨트롤러 실행 {}", userId);

        RoomVO roomVO = roomRepository.findById(userId).get();
        return roomVO;
    }


    // setting 게시판
    @GetMapping("/{userId}/setting")
    public RoomVO main(@PathVariable String userId) {
        log.debug("setting 컨트롤러 실행");
        RoomVO roomVO = roomService.findById(userId);
        return roomVO;
    }
}
