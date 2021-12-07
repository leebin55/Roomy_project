package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.service.BoardService;
import com.roomy.service.FileService;
import com.roomy.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequestMapping("/room/gallery")
@RestController
public class GalleryController {

    private final FileService fileService;
    @Qualifier("galleryService")
    private final BoardService galleryService ;
    private final LikeService likeService;

    public GalleryController(FileService fileService, BoardService galleryService, LikeService likeService) {
        this.fileService = fileService;
        this.galleryService = galleryService;
        this.likeService = likeService;
    }

    // 갤러리 맨 처음 보여주는 리스트 return
    @GetMapping({"/",""})
    public List<BoardVO> list(){
        List<BoardVO> boardList = galleryService.selectAll();
        List<BoardVO> boardImgList= fileService.selectAllWithImage(boardList);
        log.debug("select all : {}",boardList.toString());
        return boardImgList;
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
    public String write( @ModelAttribute  BoardVO boardVO ) {
        log.debug("controller_boardVO : {}",boardVO.toString());
        galleryService.insert(boardVO);
        return "ok";

    }

    // editor 에서 이미지를 등록하면 base64로 변경됨 그래서 url 로 바꿔줌
    @PutMapping("/img")
    public String img(@RequestParam("img") MultipartFile img){
      log.debug("받아온 파일 이름 {}",img.getOriginalFilename());
      String newFileName = fileService.uploadFile(img);
      log.debug("보낼 url {}:","http://localhost:8080/uploads/"+ newFileName);
        return "http://localhost:8080/uploads/"+ newFileName;
    }

    // 갤러리 게시글 수정
    @PutMapping("/update")
    public void update(BoardVO boardVO){
        galleryService.insert(boardVO);

    }

    //삭제
    @GetMapping("/delete/{board_seq}")
    public void delete(@PathVariable Long board_seq){
        galleryService.delete(board_seq);

    }

    //좋아요 클릭 할때 실행되는 method
    @PostMapping("/like")
    public int like(@RequestBody LikeVO likeVO){
        log.debug("likeVO {} ",likeVO.toString());
        int likeNum = likeService.insertOrDelete(likeVO);
        return likeNum;
    }


    @PutMapping("/beforeCheck")
    // gallery 리스트가 뜰때 좋아요를 이전에 눌렀는지 처음 한번만 확인하는 method
    public Boolean beforeLikeCheck(@RequestBody LikeVO likeVO){
        return likeService.likeCheck(likeVO);

    }


    //댓글



}
