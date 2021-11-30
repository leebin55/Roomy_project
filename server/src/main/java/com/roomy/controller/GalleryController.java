package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.service.GalleryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    private final  GalleryService galleryService ;

    @GetMapping({"/",""})
    public List<BoardVO> list(){
        List<BoardVO> boardList = galleryService.selectAll();
        log.debug("select all : {}",boardList.toString());
        return boardList;
    }

}
