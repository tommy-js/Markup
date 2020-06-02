import React from "react";
import { Tasks } from "./Tasks";
import "../../../App.scss";

export const TaskList: React.FC = () => {
  return (
    <div className="task_list">
      <div className="horizontal_push">
        <Tasks />
      </div>
    </div>
  );
};
