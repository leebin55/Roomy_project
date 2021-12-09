package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/room/board")
public class BoardController {

    @Qualifier("boardService")
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping({"/",""})
    public List<BoardVO> list() {
        log.debug("board list 컨트롤러 실행");
        List<BoardVO> boardList = boardService.selectAll();
        return boardList;
    }

//    @GetMapping({"/",""})
//    public Page<BoardVO> list(Pageable pageable) {
//        // 페이지네이션 진행중
//        log.debug("board list 컨트롤러 실행");
//        Page<BoardVO> borderPages = boardService.selectAll(pageable);
//        log.debug(borderPages.toString());
//        return borderPages;
//    }

    @PostMapping(value = {"/", ""})
    public void insert(@RequestBody  BoardVO boardVO) {
        log.debug("write 컨트롤러 실행");
        log.debug(boardVO.toString());
        log.debug(boardVO.getBoardContent());
        boardService.insert(boardVO);
    }

    @GetMapping(value={"/{board_seq}"})
    public BoardVO detail(@PathVariable Long board_seq) {
        log.debug("board detail 컨트롤러 실행 {}",board_seq);
//        Long board_seq = Long.valueOf(seq);
        BoardVO boardVO = boardService.findById(board_seq);
        return boardVO;
    }

    @DeleteMapping(value="/{board_seq}")
    public void delete(@PathVariable Long board_seq) {
        log.debug("board delete 컨트롤러 실행");
        boardService.delete(board_seq);
    }

    @GetMapping(value="/search")
    public List<BoardVO> search(@RequestParam String query, @RequestParam String select) {
        // select : select box 에서 제목, 제목+내용, 내용 중 뭘 선택했는지
        // query : 검색어
        log.debug("board search 컨트롤러 실행");
        List<BoardVO> list = boardService.search(select,query);
        return list;
    }
}
