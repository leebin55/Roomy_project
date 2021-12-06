package com.roomy.repository;

import com.roomy.model.BoardVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;


@Repository
public interface BoardRepository extends JpaRepository<BoardVO,Long> {

    List<BoardVO> findAllByBoardCode(int boardCode);

}
