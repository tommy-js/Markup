import React, { useState, useEffect, useContext } from "react";
import { IndividualTask } from "./IndividualTask";
import { userContext } from "../App";
import AddTask from "./AddTask";
import "../App.scss";

export const Tasks: React.FC = () => {
  const { userVal, setUserVal } = useContext(userContext);
  const tasks = [
    {
      title: "Edit main page",
      id: 0
    },
    {
      title: "Add some CSS to secondary page",
      id: 1
    }
  ];
  const [displayTask, setDisplayTask] = useState(true);
  const [stateTasks, setStateTasks] = useState(tasks);

  function addTasks(addParam: string) {
    let newTask = { title: addParam, id: tasks.length };
    setStateTasks(prev => [...prev, newTask]);
  }

  function clearTasks() {
    setDisplayTask(!displayTask);
  }

  return (
    <div className="task_box">
      {stateTasks.map(task => (
        <IndividualTask
          key={task.id}
          task={task.title}
          displayTask={displayTask}
        />
      ))}
      <div className="task_buttons">
        <AddTask addTasks={addTasks} clearTasks={clearTasks} />
      </div>
    </div>
  );
};
