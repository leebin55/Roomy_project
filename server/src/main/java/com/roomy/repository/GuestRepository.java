package com.roomy.repository;

import com.roomy.model.GuestVO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestRepository extends JpaRepository<GuestVO, Long> {
}
