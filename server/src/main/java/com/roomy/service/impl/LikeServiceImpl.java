package com.roomy.service.impl;

import com.roomy.model.LikeVO;
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

//    @Override
//    public List<LikeVO> findByUserSeq(Long user_seq) {
//        List<LikeVO> likeVO=likeRepository.findByUserSeq(user_seq);
//        return likeVO;
//    }
//
//    @Override
//    public void likeCheck(LikeVO likeVO) {
//        log.debug("service : {}",likeVO.toString());
//        Long userSeq = likeVO.getUser_seq();
//        Long boardSeq = likeVO.getBoard_seq();
//        // user 와 board  seq 를 이용해서 likeData 조회
//        LikeVO likeData = likeRepository.findByUserSeqAndBoardSeq(userSeq,boardSeq);
//        // likeData 가 null 이면 > 좋아요 누른 적 없음
//        log.debug("likecheck : {} ",likeData.toString());
//        if(likeData == null){
//            likeRepository.save(likeVO);
//            // likeData 가 있으면 like_seq 로 데이터 지우기
//        }else{
//            likeRepository.deleteById(likeData.getLike_seq());
//        }
//    }
//
//


//    @Override
//    public void insert(LikeVO likeVO) {
//
//    }
//
//
//    @Override
//    public void delete(Long like_seq) {
//
//    }
}
