package com.roomy.repository;

import com.roomy.model.TodoVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoVO, Long> {

    List<TodoVO> findAllByUserId(String userId);

}