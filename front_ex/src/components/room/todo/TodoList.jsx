import React, { useEffect, useState } from "react";
import Axios from "axios";
function TodoList() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/todo/list")
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result);
        //console.log(result);
        //console.log(todoList);
      });
  }, []);

  const onSuccessClick = (e) => {
    const id = e.target.dataset.id;
    console.log("success id:", id);

    Axios.put(`http://localhost:8080/todo/success/${id}`);
  };
  const onSuccessCancel = (e) => {
    const id = e.target.dataset.id;
    console.log("cancel id:", id);
    Axios.put(`http://localhost:8080/todo/cancel/${id}`);
  };
  const onImportUpdate = (e) => {
    const id = e.target.dataset.id;
    console.log("importUpdated id:", id);
    Axios.put(`http://localhost:8080/todo/important/${id}`);
  };
  const onNormalUpdate = (e) => {
    const id = e.target.dataset.id;
    console.log("normalUpdated id:", id);
    Axios.put(`http://localhost:8080/todo/normal/${id}`);
  };
  const onDeleteClick = (e) => {
    const id = e.target.dataset.id;
    if (window.confirm("삭제하시겠습니까?")) {
      Axios.delete(`http://localhost:8080/todo/delete/${id}`);
    }
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
