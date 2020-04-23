import React, { useState, useEffect } from "react";
import "../App.scss";

interface Props {
  task: string;
  displayTask: boolean;
}

export const IndividualTask: React.FC<Props> = props => {
  const [checking, setChecking] = useState(false);
  const [showTask, setShowTask] = useState(true);
  const [displayed, setDisplayed] = useState("none");

  useEffect(() => {
    setShowTask(props.displayTask);
  }, [props.displayTask]);

  useEffect(() => {
    if (!checking) {
      setDisplayed("block");
    } else {
      setDisplayed("none");
    }
  }, [showTask]);

  return (
    <div className="individual_task" style={{ display: displayed }}>
      <p className="inner_task_block">{props.task}</p>
      <input
        className="inner_task_block"
        type="checkbox"
        checked={checking}
        onChange={() => setChecking(!checking)}
      />
    </div>
  );
};
