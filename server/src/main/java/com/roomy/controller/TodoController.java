package com.roomy.controller;

import com.roomy.model.Todo;
import com.roomy.repository.TodoRepository;
import com.roomy.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/room/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private TodoRepository todoRepository;

    @PostMapping(value="/insert")
    public String insertTodo(@RequestBody String app){
        Todo todo = new Todo();
        todo.setContent(app);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setImportant(0);
        todo.setOk(false);
        todoRepository.save(todo);
        return "success";
    }

    @GetMapping(value="/list")
    public List<Todo> getTodoList(){
        return todoService.getTodoList();
    }

    @PutMapping(value="/success/{id}")
    public void todoSuccess(@PathVariable("id") Long id) throws Exception {
        Optional<Todo> updated = todoRepository.findById(id);
        if(updated.isPresent()){
            Todo updatedTodo = updated.get();
            updatedTodo.setOk(true);
            todoRepository.save(updatedTodo);
        } else {
            throw new Exception();
        }
    }
    @PutMapping(value="/cancel/{id}")
    public void successCancel(@PathVariable("id") Long id) throws Exception {
        Optional<Todo> cancel = todoRepository.findById(id);
        if(cancel.isPresent()){
            Todo cancelTodo = cancel.get();
            cancelTodo.setOk(false);
            todoRepository.save(cancelTodo);
        }else {
            throw new Exception();
        }
    }
    @PutMapping(value="/important/{id}")
    public void importantUpdate(@PathVariable("id") Long id) throws Exception{
        Optional<Todo> updatedImport = todoRepository.findById(id);
        if(updatedImport.isPresent()) {
            Todo importTodo = updatedImport.get();
            importTodo.setImportant(1);
            todoRepository.save(importTodo);
        }else {
            throw new Exception();
        }
    }
    @PutMapping(value = "/normal/{id}")
    public void normalUpdate(@PathVariable("id") Long id) throws Exception{
        Optional<Todo> normal = todoRepository.findById(id);
        if(normal.isPresent()){
            Todo normalUpdate = normal.get();
            normalUpdate.setImportant(0);
            todoRepository.save(normalUpdate);
        }else {
            throw new Exception();
        }
    }
    @DeleteMapping("/delete/{id}")
    public void deleteTodo(@PathVariable("id") Long id){
        todoRepository.deleteById(id);
    }

}
