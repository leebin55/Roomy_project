import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../../../css/todo/TodoMain.css";
import { useNavigate } from "react-router-dom";
// import { useTodoContext } from "../../../context/TodoContextProvider";

function TodoMain() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div className="mainContainer">
      <div className="headerContainer">
        <h1 onClick={onClick}>TODO LIST</h1>

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
