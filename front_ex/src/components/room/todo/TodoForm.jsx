import React from "react";
import { useTodoContext } from "../../../context/TodoContextProvider";

function TodoForm() {
  const { todoVal, enterKeyPress, dataInsert, todo } = useTodoContext();

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
