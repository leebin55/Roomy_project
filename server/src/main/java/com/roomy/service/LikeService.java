package com.roomy.service;

import com.roomy.model.LikeVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface LikeService{

    // user_seq 로 조회> 자신이 좋아요한 게시물 볼수 있게
   // List<LikeVO> findByUserSeq(Long user_seq);

   //board 와 user seq 로 해당 데이터가 tbl_like에 있는지 확인하고
    // 없으면 insert 있으면 delete 를 수행
    //void likeCheck(LikeVO likeVO);

    // 하트 클릭하면 좋아요 데이터 추가
   // void insert(LikeVO likeVO);

    // 좋아요 취소
  //  void delete(Long like_seq);
}
