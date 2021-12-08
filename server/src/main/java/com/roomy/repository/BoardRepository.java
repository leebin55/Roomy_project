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

    List<BoardVO> findByBoardTitleContaining(String keyword);

}