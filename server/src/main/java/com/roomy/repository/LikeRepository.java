package com.roomy.repository;

import com.roomy.model.LikeVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<LikeVO,Long> {

    // board 와 user seq 로 해당 데이터가 존재 하는지 확인
   boolean existsByBoardSeqAndUserSeq(Long board_seq, Long user_seq);

    @Query(value = "SELECT likeSeq FROM LikeVO " +
            "WHERE boardSeq = :board_seq " +
            "AND userSeq = :user_seq")
    Long findByUserSeqAndBoardSeq(@Param(value="user_seq") Long user_seq,@Param(value ="board_seq") Long board_seq);
    List<LikeVO> findByUserSeq(Long userSeq);
}
