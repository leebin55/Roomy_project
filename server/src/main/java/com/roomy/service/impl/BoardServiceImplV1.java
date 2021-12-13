package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.repository.BoardRepository;
import com.roomy.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

//    @Override
//    public Page<BoardVO> selectAll(Pageable pageable) {
//        // 페이지네이션 진행중
//        // repository 의 findAll 에는 매개변수가 있는 것과 없는 것 둘 다 기본으로 있다
//        log.debug("페이지네이션 서비스 실행");
//        return boardRepository.findAllByBoardCodeOrderByBoardSeqDesc(2, pageable);
//    }

    @Override
    public BoardVO findById(Long board_seq) {
        BoardVO boardVO = boardRepository.findById(board_seq).orElse(null);
//        log.debug("findById 나와라 {}",boardVO.toString());
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
        LocalDateTime localDateTime = LocalDateTime.now();
        String dateTime = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        boardVO.setBoardUpdateAt(dateTime);

        boardRepository.save(boardVO);
    }

    @Override
    public void delete(Long board_seq) {
        boardRepository.deleteById(board_seq);
    }

    @Override
    public List<BoardVO> search(String select, String query) {
        List<BoardVO> list = null;

        if(select.equals("0")) { // 제목만 선택했으면
            list = boardRepository.findByTitle(query);
        } else if(select.equals("1")) { // 제목+내용 선택했으면
            list = boardRepository.findByTitleAndContent(query);
        } else if(select.equals("2")) { // 내용만 선택했으면
            list = boardRepository.findByContent(query);
        }
        return list;
    }
}
