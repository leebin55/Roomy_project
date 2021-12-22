package com.roomy.service;

import com.roomy.model.TodoVO;

import java.util.List;

public interface TodoService {

//    public Todo updateOk(Long id, Todo todo);
    public List<TodoVO> getTodoList();

}
