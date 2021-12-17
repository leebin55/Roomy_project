package com.roomy.repository;

import com.roomy.model.RoomVO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<RoomVO,String> {
}
