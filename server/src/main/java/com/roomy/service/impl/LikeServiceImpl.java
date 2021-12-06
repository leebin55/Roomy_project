package com.roomy.service.impl;

import com.roomy.model.BoardVO;
import com.roomy.model.LikeVO;
import com.roomy.repository.BoardRepository;
import com.roomy.repository.LikeRepository;
import com.roomy.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final BoardRepository galleryRepository;

    @Override
    public List<LikeVO> findByUserSeq(Long user_seq) {
        List<LikeVO> likeVO = likeRepository.findByUserSeq(user_seq);
        return likeVO;

    }

    @Override
    public Boolean likeCheck(LikeVO likeVO) {
        Long board_seq = likeVO.getBoardSeq();
        Long user_seq = likeVO.getUserSeq();
        boolean checkExist = likeRepository
                .existsByBoardSeqAndUserSeq(board_seq, user_seq);
        log.debug("exists: {}", checkExist);
//        if (checkExist == false) {

//
//        } else {
//            long like_seq = findByUserSeqAndBoardSeq(board_seq, user_seq);
//            delete(like_seq);
//        }
        return checkExist;
    }

    @Override
    public int insertOrDelete(LikeVO likeVO){
        // 데이터가 이미 존재 > 데이터 삭제후 좋아요 수 리턴
        Boolean checkExist = likeCheck(likeVO);
        if(checkExist==true){
            return delete(likeVO);
        }else{
            // 데이터 존재하지 않음 > 데이터 Insert후 좋아요수 리턴
            return insert(likeVO);
        }
    }




    public int insert(LikeVO likeVO) {
        // tbl_board_like 테이블에 데이터 저장
        likeRepository.save(likeVO);
        Long boardSeq = likeVO.getBoardSeq();
        // 데이터 생성한 뒤 boardSeq 로 BoardVO 찾아 board_like+1 올려줌
        BoardVO boardVO = galleryRepository.findById(boardSeq).get();
        int countLike = boardVO.getBoardLike();
        boardVO.setBoardLike(++countLike);
        galleryRepository.save(boardVO);
        return countLike;
    }
    @Override
    public int delete(LikeVO likeVO){
        // user와 board seq 로 like seq 조회
        long like_seq = findByUserSeqAndBoardSeq(likeVO.getUserSeq(), likeVO.getBoardSeq());
        // 좋아요 데이터 삭제
        likeRepository.deleteById(like_seq);
        // 게시물에서 board_seq 로 해당 게시물 찾기
        BoardVO boardVO=galleryRepository.getById(likeVO.getBoardSeq());
        // 해당 게시물 좋아요 수
        int countLike=boardVO.getBoardLike();
        // 좋아요수 -1 해서 다시 setter
        boardVO.setBoardLike(--countLike);
        // update
        galleryRepository.save(boardVO);
        //좋아요 수를 return > client에서 바로 좋아요수를 axios를 통해 값을 변경하기 위해
        return countLike;

    }






    public Long findByUserSeqAndBoardSeq(Long user_seq, Long board_seq) {
        return likeRepository.findByUserSeqAndBoardSeq(user_seq, board_seq);
    }
}


