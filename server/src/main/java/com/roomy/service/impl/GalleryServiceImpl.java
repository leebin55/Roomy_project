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
    // 피드에서 조회(10개만 부르기)
    @Override
    public List<BoardVO> selectAll() {
        List<BoardVO> list = galleryRepository.findTop10ByBoardCodeOrderByBoardSeqDesc(2);
        return list;
    }
    // userid 와 boardCode 를 받아서 게시글 조회
    @Override
    public List<BoardVO> readBoardList(int boardCode, String userId) {

        List<BoardVO> list = galleryRepository.findAllByBoardCodeAndBoardUserIdOrderByBoardSeqDesc(2,userId);
        return list;
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
        if(imgURLs != null){
            log.debug(">>> ",imgURLs.toString());
            //   imageURL 개수만큼 반복
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
    }


    @Override
    public void update(BoardVO boardVO) {

        galleryRepository.save(boardVO);
        Long board_seq =boardVO.getBoardSeq();

    }

    // insert와 update 할때 tbl_board먼저 insert나 update한 후
    // seq 를 가져와 tbl_board_image 에 insert나 save
//    public List<BoardImageVO> forIMGs(BoardVO boardVO){
//        List<BoardImageVO> imageVOList = new ArrayList<>();
//        Long board_seq = boardVO.getBoardSeq();
//        List<String> imgURLs = boardVO.getImgURL();
//        // imageURL 개수만큼 반복
//        for(String image:imgURLs){
//            //BoardImageVO 객체 생성
//            BoardImageVO imageVO = new BoardImageVO();
//            // VO 에  imageurl 과 boardseq set
//            imageVO.setImgUrl(image);
//            imageVO.setImgBoardSeq(board_seq);
//            imageVOList.add(imageVO);
//         }
//        return imageVOList;
//
//    }
    @Override
    public void delete(Long board_seq){
    galleryRepository.deleteById(board_seq);
    // boardImg 테이블에  해당 게시판 번호의 이미지가 하나라도 존재하면
//        List<String> imgList = fileRepository.findByImgBoardSeq(board_seq);
//    if(imgList.size()>0){
//        fileRepository.deleteByImgBoardSeq(board_seq);
//    }
    
    }


//    @Override
//    public Page<BoardVO> selectAll(Pageable pageable) {
//        return null;
//    }

    @Override
    public List<BoardVO> search(String select, String query) {
        return null;
    }
}
// 조회수 계속 증가 막기