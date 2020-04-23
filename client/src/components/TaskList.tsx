import React from "react";
import { Tasks } from "./Tasks";
import "../App.scss";

export const TaskList: React.FC = () => {
  return (
    <div className="task_list">
      <h1 className="task_list_header">Your Tasks</h1>
      <Tasks />
    </div>
  );
};
