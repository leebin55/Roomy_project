package com.roomy.service.impl;

import com.roomy.model.LikeVO;
import com.roomy.repository.LikeRepository;
import com.roomy.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

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
    public void insertOrDelete(LikeVO likeVO){
        // 데이터가 이미 존재
        Boolean checkExist = likeCheck(likeVO);
        if(checkExist==true){
            long like_seq = findByUserSeqAndBoardSeq(likeVO.getUserSeq(), likeVO.getBoardSeq());
            delete(like_seq);
        }else{
            insert(likeVO);
        }
    }

    @Override
    public void insert(LikeVO likeVO) {
        likeRepository.save(likeVO);
    }

    @Override
    public void delete(Long like_seq) {
        likeRepository.deleteById(like_seq);
    }


    public Long findByUserSeqAndBoardSeq(Long user_seq, Long board_seq) {
        return likeRepository.findByUserSeqAndBoardSeq(user_seq, board_seq);
    }
}


