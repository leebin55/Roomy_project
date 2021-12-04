import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../../../css/todo/TodoMain.css";
import { useTodoContext } from "../../../context/TodoContextProvider";

function TodoMain() {
  const { getList } = useTodoContext();
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <h1>TODO LIST</h1>
        <p>write down all the things to do!</p>
      </div>
      <div className="formContainer">
        <TodoForm />
      </div>
      <div className="listContainer">
        <TodoList />
      </div>
    </div>
  );
}

export default TodoMain;
