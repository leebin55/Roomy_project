import React from "react";
import TodoMain from "./todo/TodoMain";
import TodoContextProvider from "../../context/TodoContextProvider";

function Todo() {
  return (
    <TodoContextProvider>
      <TodoMain />
    </TodoContextProvider>
  );
}

export default Todo;
