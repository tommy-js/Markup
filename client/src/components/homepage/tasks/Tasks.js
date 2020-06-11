import React, { useState, useEffect, useContext } from "react";
import { ClearTaskList } from "./ClearTaskList";
import IndividualTask from "./IndividualTask";
import { userContext } from "../../../App";
import AddTask from "./AddTask";
import "../../../App.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function Tasks() {
  const { userVal, setUserVal } = useContext(userContext);
  const [displayTask, setDisplayTask] = useState(true);
  const [loadIfEmpty, setLoadIfEmpty] = useState("Add a task to start...");
  const [emptyContainer, setEmptyContainer] = useState(true);

  function clearTasks() {
    setDisplayTask(!displayTask);
  }

  useEffect(() => {
    if (userVal.tasks) {
      setEmptyContainer(false);
    }
  }, [userVal.tasks]);

  if (emptyContainer) {
    return (
      <div className="task_box_container">
        <div className="task_box">
          <p className="load_if_empty">{loadIfEmpty}</p>
        </div>
        <div className="task_buttons">
          <AddTask clearTasks={clearTasks} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="task_box_container">
        <div className="task_box">
          <div className="tasklist_container">
            {userVal.tasks.map(task => (
              <IndividualTask
                key={task.id}
                userId={userVal.id}
                id={task.id}
                task={task.content}
                displayTask={displayTask}
              />
            ))}
          </div>
        </div>
        <div className="task_buttons">
          <AddTask clearTasks={clearTasks} />
        </div>
      </div>
    );
  }
}
