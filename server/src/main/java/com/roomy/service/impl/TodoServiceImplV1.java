package com.roomy.service.impl;

import com.roomy.model.Todo;
import com.roomy.repository.TodoRepository;
import com.roomy.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
    public List<Todo> getTodoList() {
        List<Todo> getTodo = todoRepository.findAll();
        return getTodo;
    }



}