import React from "react";
import { useTodoContext } from "../../../context/TodoContextProvider";
function TodoForm() {
  const { todoVal, insertTodo, getList, setTodo, todo } = useTodoContext();

  const enterKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (todo === "") {
        alert("할일을 입력해주세요.");
      }
      await insertTodo();
      await setTodo("");
    }
    await getList();
  };

  const dataInsert = async () => {
    if (todo === "") {
      alert("할일을 입력해주세요.");
    }
    await insertTodo();
    await getList();
    await setTodo("");
  };

  return (
    <div>
      <div className="formBody">
        <p>할일을 클릭하면 완성으로 표시, 체크를 클릭하면 중요도 바뀜</p>
        <input
          type="text"
          placeholder="write your to-do.."
          onChange={todoVal}
          onKeyPress={enterKeyPress}
          value={todo || ""}
        />
        <button type="submit" onClick={dataInsert}>
          add
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
