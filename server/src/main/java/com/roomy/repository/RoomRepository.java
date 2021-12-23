package com.roomy.repository;

import com.roomy.model.RoomVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomVO,String> {

    // 미니홈피명 검색
    // 조회수 높은 순대로 내림차순
    @Query("SELECT r FROM RoomVO r WHERE r.roomName LIKE %:query% ORDER BY r.roomTotal DESC")
    List<RoomVO> findByRoomName(String query);

//    // 회원명 검색 (보류)
//    @Query("SELECT r FROM RoomVO r WHERE ")
//    List<RoomVO> findByUserName(String query);
}
