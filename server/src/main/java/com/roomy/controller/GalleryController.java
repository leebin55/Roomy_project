package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.service.GalleryService;
import com.roomy.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@DynamicInsert
@RequiredArgsConstructor
@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    private final  GalleryService galleryService ;
    private final LikeService likeService;

    
    // 갤러리 맨 처음 보여주는 리스트 return
    @GetMapping({"/",""})
    public List<BoardVO> list(){
        List<BoardVO> boardList = galleryService.selectAll();
        log.debug("select all : {}",boardList.toString());
        return boardList;
    }

    // 게시물 번호(seq)로 찾아 해당 게시물 return
    @GetMapping("/detail")
    public BoardVO detail(@RequestParam Long board_seq){
        BoardVO boardVO = galleryService.findById(board_seq);
        // 해당 게시물 클릭 할 때마다 board_hit +1 조회수 증가
        boardVO.setBoardHit(boardVO.getBoardHit()+1);
        log.debug("findbyId : {}" , boardVO.toString());
        return boardVO;
    }

    // 갤러리 등록할 때 post 로  데이터 받아오고 ok를 넘겨줌
    @PostMapping("/write")
    public String write(@RequestBody BoardVO boardVO){
        log.debug("boardVO : {}",boardVO.toString());
        galleryService.insert(boardVO);
        return "ok";

    }
// 갤러리 게시글 수정
    @PostMapping("/update")
    public String update(@RequestBody BoardVO boardVO){
        galleryService.update(boardVO);
        return "ok";
    }

    //삭제
    @GetMapping("/delete/{board_seq}")
    public void delete(@PathVariable Long board_seq){
        galleryService.delete(board_seq);

    }

    //좋아요 클릭
    @PostMapping("/like")
    public int like(@RequestBody LikeVO likeVO){
        log.debug("likeVO {} ",likeVO.toString());
<<<<<<< HEAD
<<<<<<< HEAD
      int likeNum = likeService.insertOrDelete(likeVO);

        return likeNum;
=======
=======
>>>>>>> 0060080c1a6b39e2765999861fdc3c2e0b279b60
        likeService.insertOrDelete(likeVO);
        return "ok";
>>>>>>> 4efcafbb61d27a096191bcd0392776ea256e80c2
    }



    //댓글



}
