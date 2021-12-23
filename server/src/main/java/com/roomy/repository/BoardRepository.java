package com.roomy.repository;

import com.roomy.model.BoardVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BoardRepository extends JpaRepository<BoardVO,Long> {


    List<BoardVO> findAllByBoardCode(int boardCode);

    // 보드 코드와 유저 아이디를 받아 해당 유저의 미니홈피에서 게시글 조회
    List<BoardVO> findAllByBoardCodeAndBoardUserIdOrderByBoardSeqDesc(int boardCode, String userId);

    //findTop4ByOrderByGuestSeqDesc();

    // 피드에서 최신순으로 조회
    List<BoardVO> findTop10ByBoardCodeOrderByBoardSeqDesc(int boardCode);

    // 제목만 검색
    @Query("SELECT b FROM BoardVO b WHERE b.boardTitle LIKE %:query% AND b.boardCode =:boardCode ORDER BY b.boardSeq DESC")
    List<BoardVO> findByTitle(String query, @Param(value = "boardCode") int boardCode);

    // 제목+내용 검색
    @Query("SELECT b FROM BoardVO b WHERE (b.boardTitle LIKE %:query% OR b.boardContent LIKE %:query%) AND b.boardCode=:boardCode ORDER BY b.boardSeq DESC")
    List<BoardVO> findByTitleAndContent(String query, @Param(value = "boardCode") int boardCode);

    // 내용만 검색
    @Query("SELECT b FROM BoardVO b WHERE b.boardContent LIKE %:query% AND b.boardCode =:boardCode  ORDER BY b.boardSeq DESC")
    List<BoardVO> findByContent(String query, @Param(value = "boardCode") int boardCode);

//    페이지네이션
//    Page<BoardVO> findAllByBoardCodeOrderByBoardSeqDesc(int boardCode, Pageable pageable);

}