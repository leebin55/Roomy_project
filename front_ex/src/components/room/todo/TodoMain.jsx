import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./css/TodoMain.css";

function TodoMain() {
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
