package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    private GalleryService galleryService ;

    @GetMapping({"/",""})
    public List<BoardVO> list(){
        List<BoardVO> boardList = galleryService.selectAll();
        System.out.println(boardList.toString());
        return boardList;
    }

}
