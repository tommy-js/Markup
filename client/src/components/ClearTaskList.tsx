import React from "react";

interface Props {
  clearTasks: () => void;
}

export const ClearTaskList: React.FC<Props> = props => {
  return (
    <div>
      <button onClick={props.clearTasks}>Clear Completed</button>
    </div>
  );
};
