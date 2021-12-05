package com.roomy.repository;

import com.roomy.model.BoardImageVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface FileRepository extends JpaRepository<BoardImageVO,Long> {

}
