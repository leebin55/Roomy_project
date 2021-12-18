package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.service.BoardService;
import com.roomy.service.LikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/room")
public class BoardController {

    @Qualifier("boardService")
    private final BoardService boardService;

    private final LikeService likeService;

    public BoardController(BoardService boardService, LikeService likeService) {
        this.boardService = boardService;
        this.likeService = likeService;
    }

    @GetMapping("/{userId}/board")
    public List<BoardVO> list(@PathVariable("userId") String userId) {
        log.debug("board list 컨트롤러 실행");
        List<BoardVO> boardList = boardService.readBoardList( userId);
        return boardList;
    }

    // 페이지네이션 하다 멈춤
//    @GetMapping({"/",""})
//    public Page<BoardVO> list(Pageable pageable) {

//        log.debug("board list 컨트롤러 실행");
//        Page<BoardVO> borderPages = boardService.selectAll(pageable);
//        log.debug(borderPages.toString());
//        return borderPages;
//    }

    @PostMapping("/{userId}/board")
    public void insert(@RequestBody BoardVO boardVO) {
        log.debug("write 컨트롤러 실행");
        log.debug(boardVO.toString());
        boardService.insert(boardVO);
    }

    @GetMapping("/{userId}/board/{board_seq}")
    public BoardVO detail(@PathVariable Long board_seq) {
        log.debug("board detail 컨트롤러 실행 {}",board_seq);
        BoardVO boardVO = boardService.findById(board_seq);

        //

        // 좋아요 눌렀는지 여부 확인 위해 likeVO 생성하고 게시물번호, 유저번호 넣어줌
        LikeVO likeVO = new LikeVO();
        likeVO.setBoardSeq(board_seq);
        likeVO.setUserSeq(1L);

        Boolean check = likeService.likeCheck(likeVO);

        boardVO.setCheckLike(check);

        log.debug(boardVO.toString());
        return boardVO;
    }

    @PutMapping("/{userId}/board")
    public void update(@RequestBody BoardVO boardVO) {
        log.debug("board update 컨트롤러 실행 {}", boardVO.toString());
        boardService.update(boardVO);
    }

    @DeleteMapping("/{userId}/board/{board_seq}")
    public void delete(@PathVariable Long board_seq) {
        log.debug("board delete 컨트롤러 실행");
        boardService.delete(board_seq);
    }

    @GetMapping("/{userId}/board/{board_seq}/search")
    public List<BoardVO> search(@RequestParam String query, @RequestParam String select) {
        // select : select box 에서 제목, 제목+내용, 내용 중 뭘 선택했는지
        // query : 검색어
        log.debug("board search 컨트롤러 실행");
        List<BoardVO> list = boardService.search(select,query);
        return list;
    }

    @PostMapping("/{userId}/board/{board_seq}/like")
    public int like(@RequestBody LikeVO likeVO) {
        log.debug("board like 컨트롤러 실행");
        // user 생성되면 session 에서 userSeq 뽑아올 것
        likeVO.setUserSeq(1L);
        log.debug(likeVO.toString());
        int likeNum = likeService.insertOrDelete(likeVO);
        log.debug("하짜증나 {}", String.valueOf(likeNum));
        return likeNum;
    }
}
