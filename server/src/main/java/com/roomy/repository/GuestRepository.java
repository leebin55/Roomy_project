package com.roomy.repository;

import com.roomy.model.GuestVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<GuestVO, Long> {

    // 미니홈피 메인에서 보여줄 방명록 리스트
    // 미니홈피 주인회원 id로 select 해오고 gusetSeq로 내림차순 정렬해서 top 4개만 반환
    List<GuestVO> findTop4ByUserIdOrderByGuestSeqDesc(String userId);
    
    // 방명록 게시판에서 보여줄 방명록 리스트
    List<GuestVO> findAllByUserIdOrderByGuestSeqDesc(String userId);

    // 방명록 쓴 사람의 id 찾기 (필요없을듯)
    @Query("SELECT g.guestWriterId FROM GuestVO g WHERE g.guestSeq = :guestSeq")
    String findGuestWriterIdByGuestSeq(Long guestSeq);
}
