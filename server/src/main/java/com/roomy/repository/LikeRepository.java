package com.roomy.repository;

import com.roomy.model.LikeVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<LikeVO,Long> {

//    LikeVO findByUserSeqAndBoardSeq(Long user_seq,Long board_seq);
//
//    List<LikeVO> findByUserSeq(Long user_seq);
}
