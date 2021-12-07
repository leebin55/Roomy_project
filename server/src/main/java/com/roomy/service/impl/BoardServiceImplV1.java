package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.repository.BoardRepository;
import com.roomy.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service("boardService")
public class BoardServiceImplV1 implements BoardService {

    private final BoardRepository boardRepository;

    public BoardServiceImplV1(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public List<BoardVO> selectAll() {
        List<BoardVO> list = boardRepository.findAllByBoardCode(2);
        return list;
    }

    @Override
    public BoardVO findById(Long board_seq) {
        BoardVO boardVO = boardRepository.findById(board_seq).orElse(null);
        log.debug("왜 안되니", boardVO.toString());
        return boardVO;
    }

    @Override
    public void insert(BoardVO boardVO) {
        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        boardVO.setBoardUserSeq(1L);
        boardVO.setBoardCreateAt(dateTime);
        boardVO.setBoardUpdateAt(dateTime);
//        덜씀

        boardRepository.save(boardVO);
    }

    @Override
    public void update(BoardVO boardVO) {

    }

    @Override
    public void delete(Long aLong) {

    }
}
