package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.service.BoardService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service("boardService")
public class BoardServiceImplV1 implements BoardService {
    @Override
    public List<BoardVO> selectAll() {
        return null;
    }

    @Override
    public BoardVO findById(Long aLong) {
        return null;
    }

    @Override
    public void insert(BoardVO boardVO) {
//        LocalDateTime localDateTime = LocalDateTime.now();
//        String dataTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//
//        BoardVO vo = BoardVO.builder()
//                .boardUserSeq(1)
//                .board
    }

    @Override
    public void update(BoardVO boardVO) {

    }

    @Override
    public void delete(Long aLong) {

    }
}
