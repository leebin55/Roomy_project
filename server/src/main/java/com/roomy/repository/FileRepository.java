package com.roomy.repository;

import com.roomy.model.BoardImageVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface FileRepository extends JpaRepository<BoardImageVO,Long> {

    // boardSeq 를 받아서 imageURL return
    @Query(value = "SELECT imgUrl FROM BoardImageVO " +
            "WHERE imgBoardSeq = :boardSeq " )
    List<String> findByImgBoardSeq(@Param(value="boardSeq") Long boardSeq);


    // db 에 이미지 url 모두 리턴(최신순으로)
    @Query(value = "select imgUrl,imgBoardSeq From BoardImageVO order by imgSeq")
    List<BoardImageVO> findAllBoardImgOrderBySeqDesc();
}
