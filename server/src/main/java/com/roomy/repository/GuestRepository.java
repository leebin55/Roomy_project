package com.roomy.repository;

import com.roomy.model.GuestVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<GuestVO, Long> {
    // gusetSeq로 내림차순 정렬해서 top 4개만 반환
    List<GuestVO> findTop4ByOrderByGuestSeqDesc();
}
