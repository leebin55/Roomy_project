package com.roomy.controller;

import com.roomy.model.TodoVO;
import com.roomy.repository.TodoRepository;
import com.roomy.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room")
public class TodoController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private TodoRepository todoRepository;

    @PostMapping(value="/{userId}/todo/insert")
    public String insertTodo(@RequestBody String app){
        TodoVO todoVO = new TodoVO();
        todoVO.setContent(app);
        todoVO.setCreatedAt(LocalDateTime.now());
        todoVO.setImportant(0);
        todoVO.setOk(false);
        todoRepository.save(todoVO);
        return "success";
    }

    @GetMapping(value="/{userId}/todo/list")
    public List<TodoVO> getTodoList(){
        return todoService.getTodoList();
    }

    @PutMapping(value="/{userId}/todo/success/{id}")
    public void todoSuccess(@PathVariable("id") Long id) throws Exception {
        Optional<TodoVO> updated = todoRepository.findById(id);
        if(updated.isPresent()){
            TodoVO updatedTodoVO = updated.get();
            updatedTodoVO.setOk(true);
            todoRepository.save(updatedTodoVO);
        } else {
            throw new Exception();
        }
    }
    @PutMapping(value="/{userId}/todo/cancel/{id}")
    public void successCancel(@PathVariable("id") Long id) throws Exception {
        Optional<TodoVO> cancel = todoRepository.findById(id);
        if(cancel.isPresent()){
            TodoVO cancelTodoVO = cancel.get();
            cancelTodoVO.setOk(false);
            todoRepository.save(cancelTodoVO);
        }else {
            throw new Exception();
        }
    }
    @PutMapping(value="/{userId}/todo/important/{id}")
    public void importantUpdate(@PathVariable("id") Long id) throws Exception{
        Optional<TodoVO> updatedImport = todoRepository.findById(id);
        if(updatedImport.isPresent()) {
            TodoVO importTodoVO = updatedImport.get();
            importTodoVO.setImportant(1);
            todoRepository.save(importTodoVO);
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
