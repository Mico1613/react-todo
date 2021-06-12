import React from "react";
import "./AddTask.scss";
const AddTask = React.memo(({ list, dispatch }) => {
  const ref = React.useRef();
  const [addTaskPopup, setAddTaskPopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const onEnterAddTask = (e, id) => {
    if (e.key === "Enter") {
      addTask(id);
    }
  };
  const openAddBar = () => {
    setAddTaskPopup(!addTaskPopup);
    setTimeout(() => {
      ref.current.focus();
    }, 0);
  };
  const addTask = (id) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Math.random(),
        listId: id,
        text: inputValue,
        completed: false,
      },
    });
    setInputValue("");
    setAddTaskPopup(false);
  };

  return (
    <>
      {!addTaskPopup ? (
        <button className="new-task" onClick={openAddBar}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1V15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 8H15"
              stroke="#B4B4B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Новая задача
        </button>
      ) : (
        <div className="add-task">
          <input
            type="text"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => onEnterAddTask(e, list.id)}
            ref={ref}
          />
          <div className="add-task-buttons">
            <button className="add" onClick={(e) => addTask(list.id)}>
              Добавить задачу
            </button>{" "}
            <button
              className="cancel"
              onClick={() => setAddTaskPopup(!addTaskPopup)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </>
  );
});

export default AddTask;
