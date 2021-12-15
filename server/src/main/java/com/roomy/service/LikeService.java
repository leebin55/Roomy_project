package com.roomy.service;


import com.roomy.model.LikeVO;

import java.util.List;

public interface LikeService{

    // userSeq 로 조회> 자신이 좋아요한 게시물 볼수 있게
    List<LikeVO> findByUserSeq(Long user_seq);

   //board 와 user seq 로 해당 데이터가 tbl_like에 있는지 확인
   Boolean likeCheck(LikeVO likeVO);

   //좋아요 테이블에 해당 데이터를 조회하고 그에 따른 insert 또는 delete 실행
    // 좋아요 수 리턴
    int insertOrDelete(LikeVO likeVO);

    // 하트 클릭하면 좋아요 데이터 추가
    int insert(LikeVO likeVO);

    // 좋아요 취소
    int delete(LikeVO likeVO);



}
