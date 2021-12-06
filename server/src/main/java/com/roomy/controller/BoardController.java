package com.roomy.controller;

import com.roomy.model.BoardVO;
import com.roomy.model.GuestVO;
import com.roomy.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/room/board")
public class BoardController {

    private final BoardService boardService;

    @GetMapping({"/",""})
    public List<BoardVO> list() {
        log.debug("board list 컨트롤러 실행");
        List<BoardVO> boardList = boardService.selectAll();
        return boardList;
    }

    @PostMapping(value = {"/", ""})
    public void insert(@RequestBody BoardVO boardVO) {
        log.debug("write 컨트롤러 실행");
        boardService.insert(boardVO);
    }
}
