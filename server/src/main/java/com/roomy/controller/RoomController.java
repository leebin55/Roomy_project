package com.roomy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/room")
public class RoomController {


    @GetMapping(value = {"","/"})
    public String room(){
        return "room";
    }
}
