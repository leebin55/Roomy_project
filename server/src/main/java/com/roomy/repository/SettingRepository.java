package com.roomy.repository;

import com.roomy.model.RoomVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<RoomVO, String> {
}
