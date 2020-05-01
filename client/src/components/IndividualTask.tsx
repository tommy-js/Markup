import React, { useState, useEffect } from "react";
import checked from "../icons/checked.png";
import unchecked from "../icons/unchecked.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeTaskMutation } from "../queries/queries";
import "../App.scss";

interface Props {
  task: string;
  id: number;
  displayTask: boolean;
  removeTaskMutation: (variables: object) => void;
}

const IndividualTask: React.FC<Props> = props => {
  const [checking, setChecking] = useState(false);
  const [showTask, setShowTask] = useState(true);
  const [displayed, setDisplayed] = useState("none");
  const [decorator, setDecorator] = useState("none");
  const [whitebox, setWhiteBox] = useState("white");
  const [checkState, setCheckState] = useState(unchecked);

  useEffect(() => {
    setShowTask(props.displayTask);
  }, [props.displayTask]);

  useEffect(() => {
    if (checking === false) {
      setCheckState(unchecked);
      setDecorator("none");
      setWhiteBox("white");
    } else if (checking === true) {
      setCheckState(checked);
      setDecorator("line-through");
      setWhiteBox("pink");
      console.log(props.id);
    }
  }, [checking]);

  useEffect(() => {
    if (!checking) {
      setDisplayed("block");
    } else {
      setDisplayed("none");
      props.removeTaskMutation({ variables: { id: props.id } });
    }
  }, [showTask]);

  return (
    <div className="individual_task" style={{ display: displayed }}>
      <p className="inner_task_block" style={{ textDecoration: decorator }}>
        {props.task}
      </p>
      <div className="inner_task_checkbox">
        <div
          className="checkbox_container"
          onClick={() => setChecking(!checking)}
        >
          <div
            className="whitebox_cover"
            style={{ backgroundColor: whitebox }}
          ></div>
          <img src={checkState} className="checkbox_image" />
        </div>
      </div>
    </div>
  );
};

export default compose(
  graphql(removeTaskMutation, { name: "removeTaskMutation" })
)(IndividualTask);
