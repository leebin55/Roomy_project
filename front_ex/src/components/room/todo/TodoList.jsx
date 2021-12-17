import React from "react";
import Axios from "axios";
import { useTodoContext } from "../../../context/TodoContextProvider";
import { useParams } from "react-router-dom";

function TodoList() {
  const { todoList, getList } = useTodoContext();
  const { userId } = useParams();

  const onSuccessClick = async (e) => {
    const id = e.target.dataset.id;
    console.log("success id:", id);
    if (window.confirm("정말 할일을 끝내셨나요?")) {
      await Axios.put(
        `http://localhost:8080/room/${userId}/todo/success/${id}`
      );
    }
    await getList();
  };
  const onSuccessCancel = async (e) => {
    const id = e.target.dataset.id;
    console.log("cancel id:", id);
    if (window.confirm("다시 하시겠습니까?")) {
      await Axios.put(`http://localhost:8080/room/${userId}/todo/cancel/${id}`);
    }
    await getList();
  };
  const onImportUpdate = async (e) => {
    const id = e.target.dataset.id;
    console.log("importUpdated id:", id);
    if (window.confirm("정말 중요한 할일 인가요?")) {
      await Axios.put(
        `http://localhost:8080/room/${userId}/todo/important/${id}`
      );
    }
    await getList();
  };
  const onNormalUpdate = async (e) => {
    const id = e.target.dataset.id;
    console.log("normalUpdated id:", id);
    if (window.confirm("중요하지 않은 일인가요?")) {
      await Axios.put(`http://localhost:8080/room/${userId}/todo/normal/${id}`);
    }
    await getList();
  };
  const onDeleteClick = async (e) => {
    const id = e.target.dataset.id;
    if (window.confirm("삭제하시겠습니까?")) {
      await Axios.delete(
        `http://localhost:8080/room/${userId}/todo/delete/${id}`
      );
    }
    await getList();
  };

  return (
    <div>
      {todoList.map((item) => {
        return (
          <div className="listItem" key={item.id} data-id={item.id}>
            <div
              className="listDelete"
              data-id={item.id}
              onClick={onDeleteClick}
            >
              &times;
            </div>

            {item.ok === true ? (
              <div
                className="listOk listBody"
                onClick={onSuccessCancel}
                data-id={item.id}
              >
                {item.content}
              </div>
            ) : (
              <div
                data-id={item.id}
                className="listBody"
                onClick={onSuccessClick}
              >
                {item.content}
              </div>
            )}
            {item.important === 0 ? (
              <div
                className="listCheck"
                data-id={item.id}
                onClick={onImportUpdate}
              >
                &#x2713;
              </div>
            ) : (
              <div
                className="listCheck"
                data-id={item.id}
                onClick={onNormalUpdate}
              >
                &#x2713;
              </div>
            )}
            {item.important === 0 ? (
              <div className="importNomal">일반</div>
            ) : (
              <div className="veryImport">중요</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
