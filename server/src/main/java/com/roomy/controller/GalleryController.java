package com.roomy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    @GetMapping({"/",""})
    public String list(){
        return "hello";
    }
}
