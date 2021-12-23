package com.roomy.service;

import com.roomy.model.TodoVO;

import java.util.List;

public interface TodoService {

    public List<TodoVO> getTodoList(String userId);

}