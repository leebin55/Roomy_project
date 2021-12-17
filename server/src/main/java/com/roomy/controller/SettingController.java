package com.roomy.controller;

import com.roomy.model.RoomVO;
import com.roomy.service.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room")
public class SettingController {

    private final RoomService roomService;

    public SettingController(RoomService roomService) {
        this.roomService = roomService;
    }

//    @GetMapping("/{userId}/setting")
//    public RoomVO list(@PathVariable String userId) {
//        RoomVO roomVO = roomService.findById(userId);
//        return
//    }

}
