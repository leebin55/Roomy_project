package com.roomy.repository;

import com.roomy.model.BoardVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.awt.print.Pageable;
import java.util.List;


@Repository
public interface BoardRepository extends JpaRepository<BoardVO,Long> {


    List<BoardVO> findAllByBoardCode(int boardCode);

    List<BoardVO> findAllByBoardCodeOrderByBoardSeqDesc(int boardCode);

    // 제목만 검색
    @Query("SELECT b FROM BoardVO b WHERE b.boardTitle LIKE %:query% AND b.boardCode = 2 ORDER BY b.boardSeq DESC")
    List<BoardVO> findByTitle(String query);

    // 제목+내용 검색
    @Query("SELECT b FROM BoardVO b WHERE (b.boardTitle LIKE %:query% OR b.boardContent LIKE %:query%) AND b.boardCode=2 ORDER BY b.boardSeq DESC")
    List<BoardVO> findByTitleAndContent(String query);

    // 내용만 검색
    @Query("SELECT b FROM BoardVO b WHERE b.boardContent LIKE %:query% AND b.boardCode = 2 ORDER BY b.boardSeq DESC")
    List<BoardVO> findByContent(String query);

}