import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
export const useTodoContext = () => useContext(AppContext);

function TodoContextProvider({ children }) {
  const [todo, setTodo] = useState();

  const todoVal = (e) => {
    setTodo(e.target.value);
    console.log(todo);
  };
  const insertTodo = async () => {
    // Axios.post("http://localhost:8080/todo/", {
    //   app: todo,
    // });
    await fetch("http://localhost:8080/todo/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: todo,
    }).then(() => {
      console.log("insert success");
    });
  };
  const todoClear = () => {
    setTodo("");
  };
  const enterKeyPress = (e) => {
    if (e.key === "Enter") {
      insertTodo();
      todoClear();
    }
  };

  const dataInsert = () => {
    insertTodo();
    todoClear();
  };

  const todoData = {
    todo,
    setTodo,
    todoVal,
    enterKeyPress,
    dataInsert,
  };
  return <AppContext.Provider value={todoData}>{children}</AppContext.Provider>;
}

export default TodoContextProvider;
