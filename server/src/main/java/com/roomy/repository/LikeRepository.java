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
   boolean existsByBoardSeqAndUserId(Long board_seq, String userId);

    @Query(value = "SELECT likeSeq FROM LikeVO " +
            "WHERE boardSeq = :board_seq " +
            "AND userId = :user_id")
    Long findByUserIdAndBoardSeq(@Param(value="user_id") String userId,@Param(value ="board_seq") Long board_seq);
    List<LikeVO> findByUserId(String userId);
}
