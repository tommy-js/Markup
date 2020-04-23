import React, { useState, useEffect } from "react";
import { IndividualTask } from "./IndividualTask";
import { ClearTaskList } from "./ClearTaskList";
import { AddTask } from "./AddTask";
import "../App.scss";

export const Tasks: React.FC = () => {
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
    <div>
      {stateTasks.map(task => (
        <IndividualTask
          key={task.id}
          task={task.title}
          displayTask={displayTask}
        />
      ))}
      <AddTask addTasks={addTasks} />
      <ClearTaskList clearTasks={clearTasks} />
    </div>
  );
};
