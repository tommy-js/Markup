import React from "react";
import "../../../App.scss";

interface Props {
  clearTasks: () => void;
}

export const ClearTaskList: React.FC<Props> = props => {
  return (
    <div className="inline_buttons">
      <button className="add_task_buttons" onClick={props.clearTasks}>
        Clear Completed
      </button>
      <input type="checkbox" />
    </div>
  );
};
