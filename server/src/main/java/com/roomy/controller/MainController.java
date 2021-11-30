package com.roomy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @GetMapping( {"/",""})
    public String Main(){
        return "Main Page";
    }
}