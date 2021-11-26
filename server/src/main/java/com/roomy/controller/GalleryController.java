package com.roomy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    @RequestMapping(value = {"/",""},method = RequestMethod.GET)
    public String list(){
        return "";
    }
}
