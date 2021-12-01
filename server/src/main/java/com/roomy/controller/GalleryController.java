package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.service.GalleryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    private final  GalleryService galleryService ;

    
    // 갤러리 맨 처음 리스트 
    @GetMapping({"/",""})
    public List<BoardVO> list(){
        List<BoardVO> boardList = galleryService.selectAll();
        log.debug("select all : {}",boardList.toString());
        return boardList;
    }
    @GetMapping("/")
    public String detail(@RequestParam Long board_seq){

        return "ok";
    }

    // 갤러리 등록할 때 post 로  데이터 받아오고 ok를 넘겨줌
    @PostMapping("/write")
    public String write(@RequestBody BoardVO boardVO){
        log.debug("boardVO : {}",boardVO.toString());
        galleryService.insert(boardVO);
        return "ok";

    }
// 수정
    @PostMapping("/update")
    public String update(@RequestBody BoardVO boardVO){
        galleryService.update(boardVO);
        return "ok";
    }

    //삭제
    @GetMapping("/delete")
    public String delete(@RequestParam Long board_seq){
        galleryService.delete(board_seq);
        return "ok";
    }

    //좋아요



}
