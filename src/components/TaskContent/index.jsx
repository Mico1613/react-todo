import React from "react";

import "./TaskContent.scss";

import AddTask from "../AddTask";
import TaskHeader from "../TaskHeader";
import Tasks from "../Tasks";

const TaskContent = React.memo(
  ({ tasks, lists, colors, dispatch, visibleList }) => {
    const onCompleted = (id) => {
      dispatch({
        type: "CHANGE_COMPLETED",
        payload: [
          tasks.map((task) =>
            task.id === id ? (task.completed = !task.completed) : null
          ),
        ],
      });
    };
    const deleteTask = (id) => {
      dispatch({
        type: "DELETE_TASK",
        payload: tasks.filter((task) => task.id !== id),
      });
    };

    const changeTitle = (id, inputValue) => {
      const newLists = [...lists]
      newLists.forEach((list) =>
        list.id === id ? (list.name = inputValue) : null
      );
      dispatch({
        type: "CHANGE_TITLE",
        payload: newLists
      });
    };
   
   
    return (
      <>
        {lists.map((list, index2) => {
          if (list.id === visibleList || visibleList === 0)
            return (
              <div key={`${list}_${index2}`}>
                {colors.map((color, index1) => {
                  if (list.colorId === color.id) {
                    return (
                      <div className="task-content" key={`${color}_${index1}`}>
                        <TaskHeader
                          list={list}
                          color={color}
                          changeTitle={changeTitle}
                          dispatch={dispatch}
                        />
                        <Tasks
                          tasks={tasks}
                          list={list}
                          onCompleted={onCompleted}
                          deleteTask={deleteTask}
                        />
                        <AddTask list={list} dispatch={dispatch} />
                      </div>
                    );
                  }
                })}
              </div>
            );
        })}
      </>
    );
  }
);

export default TaskContent;
