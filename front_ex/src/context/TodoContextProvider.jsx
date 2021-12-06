import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();
export const useTodoContext = () => useContext(AppContext);

function TodoContextProvider({ children }) {
  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([]);

  const todoVal = (e) => {
    setTodo(e.target.value);
  };
  const insertTodo = async () => {
    await fetch('http://localhost:8080/todo/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: todo,
    }).then((response) => {
      console.log(response);
      console.log('insert success');
    });
  };
  const getList = async () => {
    await fetch('http://localhost:8080/todo/list')
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setTodoList(result);
        // console.log(todoList);
      });
  };

  const todoData = {
    todo,
    todoList,
    setTodo,
    todoVal,
    insertTodo,
    getList,
  };
  return <AppContext.Provider value={todoData}>{children}</AppContext.Provider>;
}

export default TodoContextProvider;
