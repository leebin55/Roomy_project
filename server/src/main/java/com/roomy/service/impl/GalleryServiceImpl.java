package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.repository.BoardRepository;
import com.roomy.service.BoardService;
import com.roomy.service.GenericService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("galleryService")
public class GalleryServiceImpl implements BoardService {

    private final BoardRepository galleryRepository;

    public GalleryServiceImpl(BoardRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    @Override
    public List<BoardVO> selectAll() {
        List<BoardVO> boardList=galleryRepository.findAll();
        log.debug("selectAll(): {}",boardList.toString());
        return boardList;
    }

    @Override
    public BoardVO findById(Long board_seq) {
        //값이 없으면 NoSuchElementException (Optional)
        BoardVO boardVO= galleryRepository.findById(board_seq).get();
        return boardVO;
    }

    @Override
    public void insert(BoardVO boardVO) {

        galleryRepository.save(boardVO);
    }

    @Override
    public void update(BoardVO boardVO) {
        galleryRepository.save(boardVO);
    }

    @Override
    public void delete(Long board_seq) {
        galleryRepository.deleteById(board_seq);
    }
}
// 조회수 계속 증가 막기