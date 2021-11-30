package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.repository.GalleryRepository;
import com.roomy.service.GalleryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GalleryServiceImpl implements GalleryService {

    private GalleryRepository galleryRepository;

    public GalleryServiceImpl(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    @Override
    public List<BoardVO> selectAll() {
        List<BoardVO> boardList=galleryRepository.findAll();
        log.debug("selectAll(): []",boardList);
        return boardList;
    }

    @Override
    public BoardVO findById(Long aLong) {
        return null;
    }

    @Override
    public void insert(BoardVO boardVO) {

    }

    @Override
    public void update(BoardVO boardVO) {

    }

    @Override
    public void delete(Long aLong) {

    }
}
