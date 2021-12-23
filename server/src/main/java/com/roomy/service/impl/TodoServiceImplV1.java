package com.roomy.service.impl;

import com.roomy.model.TodoVO;
import com.roomy.repository.TodoRepository;
import com.roomy.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service("todoService")
public class TodoServiceImplV1 implements TodoService {


    private final TodoRepository todoRepository;



    @Override
    public List<TodoVO> getTodoList(String userId) {
        List<TodoVO> getTodoVO = todoRepository.findAllByUserId(userId);
        return getTodoVO;
    }
}