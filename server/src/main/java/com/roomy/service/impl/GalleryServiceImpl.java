package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.repository.GalleryRepository;
import com.roomy.service.GalleryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class GalleryServiceImpl implements GalleryService {

    private final GalleryRepository galleryRepository;

    public GalleryServiceImpl(GalleryRepository galleryRepository) {
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
