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
        List<BoardVO> list = boardRepository.findAllByBoardCodeOrderByBoardSeqDesc(2);
        return list;
    }

    @Override
    public BoardVO findById(Long board_seq) {
        BoardVO boardVO = boardRepository.findById(board_seq).orElse(null);
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
    public void delete(Long board_seq) {
        boardRepository.deleteById(board_seq);
    }

    @Override
    public List<BoardVO> search(String select, String query) {
        List<BoardVO> list = null;

        // 제목or내용 검색 매개변수 2개 넣어야 해서 변수 2개 선언하고 똑같은 값 넣음
        String query1 = query;
        String query2 = query;

        if(select.equals("0")) { // 제목만 선택했으면
            list = boardRepository.findByBoardTitleContaining(query);
        } else if(select.equals("1")) { // 제목+내용 선택했으면
            list = boardRepository.findByBoardTitleOrBoardContentContaining(query1, query2);
        } else if(select.equals("2")) { // 내용만 선택했으면
            list = boardRepository.findByBoardContentContaining(query);
        }
        return list;
    }
}
