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


//    @Override
//    @Transactional
//    public Todo updateOk(Long id, Todo todo) {
//        Optional<Todo> updated = todoRepository.findById(id);
//        todo.setOk(true);
//        return todoRepository.save(updated);
//    }

    @Override
    public List<TodoVO> getTodoList() {
        List<TodoVO> getTodoVO = todoRepository.findAll();
        return getTodoVO;
    }



}