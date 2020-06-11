import React from "react";
import { Tasks } from "./Tasks.js";
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
