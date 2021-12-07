package com.roomy.service.impl;

import com.roomy.model.BoardImageVO;
import com.roomy.model.BoardVO;
import com.roomy.repository.BoardRepository;
import com.roomy.repository.FileRepository;
import com.roomy.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service("galleryService")
public class GalleryServiceImpl implements BoardService {

    private final BoardRepository galleryRepository;
    private final FileRepository fileRepository;

    public GalleryServiceImpl(BoardRepository galleryRepository, FileRepository fileRepository) {
        this.galleryRepository = galleryRepository;
        this.fileRepository = fileRepository;
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
        // 먼저 boardVO  insert
        galleryRepository.save(boardVO);
        // insert 한후  boardVO 에서  boardSeq 가져오기
        Long board_seq = boardVO.getBoardSeq();
        // boardVO 에서 imgURL get
        List<String> imgURLs = boardVO.getImgURL();
        // imageURL 개수만큼 반복
        for(String image:imgURLs){
            //BoardImageVO 객체 생성
            BoardImageVO imageVO = new BoardImageVO();
            // VO 에  imageurl 과 boardseq set
            imageVO.setImgUrl(image);
            imageVO.setImgBoardSeq(board_seq);
            // insert
            fileRepository.save(imageVO);
        }

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