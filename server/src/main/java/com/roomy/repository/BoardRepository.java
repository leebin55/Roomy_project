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

    // 제목만 검색 (%LIKE%)
    List<BoardVO> findByBoardTitleContaining(String query);

    // 제목+내용 검색 (%LIKE%)
    List<BoardVO> findByBoardTitleOrBoardContentContaining(String query1, String query2);

    // 내용만 검색 (%LIKE%)
    List<BoardVO> findByBoardContentContaining(String query);

}