package com.roomy.controller;

import com.roomy.model.RoomVO;
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

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping( "/{userId}")
    public RoomVO room(@PathVariable Long userId){
        log.debug("room 컨트롤러 실행 {}", userId);



        RoomVO roomVO = roomService.findById(userId);
        return roomVO;
    }
}
