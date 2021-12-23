package com.roomy.repository;

import com.roomy.model.RoomVO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomVO,String> {

    List<RoomVO> findByRoomName(String query);
//    List<RoomVO> findByUserName(String query);
}
