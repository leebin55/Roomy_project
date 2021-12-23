package com.roomy.controller;

import com.roomy.model.TodoVO;
import com.roomy.repository.TodoRepository;
import com.roomy.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room")
public class TodoController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private TodoRepository todoRepository;

    @PostMapping(value="/{userId}/todo/insert")
    public String insertTodo(@PathVariable("userId") String userId,
                             @RequestBody String app){
        TodoVO todo = new TodoVO();
        todo.setContent(app);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setImportant(0);
        todo.setOk(false);
        todo.setUserId(userId);
        todoRepository.save(todo);
        return "success";
    }

    @GetMapping(value="/{userId}/todo/list")
    public List<TodoVO> getTodoList(@PathVariable("userId") String userId){
        List<TodoVO> todoList = todoService.getTodoList(userId);
        log.debug("todoList : {}", todoList);
        return todoList;
    }

    @PutMapping(value="/{userId}/todo/success/{id}")
    public void todoSuccess(@PathVariable("id") Long id) throws Exception {
        Optional<TodoVO> updated = todoRepository.findById(id);
        if(updated.isPresent()){
            TodoVO updatedTodo = updated.get();
            updatedTodo.setOk(true);
            todoRepository.save(updatedTodo);
        } else {
            throw new Exception();
        }
    }

    @PutMapping(value="/{userId}/todo/cancel/{id}")
    public void successCancel(@PathVariable("id") Long id) throws Exception {
        Optional<TodoVO> cancel = todoRepository.findById(id);
        if(cancel.isPresent()){
            TodoVO cancelTodo = cancel.get();
            cancelTodo.setOk(false);
            todoRepository.save(cancelTodo);
        }else {
            throw new Exception();
        }
    }
    @PutMapping(value="/{userId}/todo/important/{id}")
    public void importantUpdate(@PathVariable("id") Long id) throws Exception{
        Optional<TodoVO> updatedImport = todoRepository.findById(id);
        if(updatedImport.isPresent()) {
            TodoVO importTodo = updatedImport.get();
            importTodo.setImportant(1);
            todoRepository.save(importTodo);
        }else {
            throw new Exception();
        }
    }
    @PutMapping(value = "/{userId}/todo/normal/{id}")
    public void normalUpdate(@PathVariable("id") Long id) throws Exception{
        Optional<TodoVO> normal = todoRepository.findById(id);
        if(normal.isPresent()){
            TodoVO normalUpdate = normal.get();
            normalUpdate.setImportant(0);
            todoRepository.save(normalUpdate);
        }else {
            throw new Exception();
        }
    }
    @DeleteMapping("/{userId}/todo/delete/{id}")
    public void deleteTodo(@PathVariable("id") Long id){
        todoRepository.deleteById(id);
    }

}