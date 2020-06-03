import React, { useState, useEffect } from "react";
import checked from "../../../icons/checked.png";
import unchecked from "../../../icons/unchecked.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeTaskMutation } from "../../../queries/queries";
import "../../../App.scss";
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu
} from "react-contextmenu";

interface Props {
  task: string;
  id: number;
  userId: number;
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
    }
  }, [checking]);

  useEffect(() => {
    if (!checking) {
      setDisplayed("block");
    } else {
      setDisplayed("none");
      props.removeTaskMutation({
        variables: { userId: props.userId, id: props.id }
      });
    }
  }, [showTask]);

  function contextMenu() {
    return (
      <ContextMenu id="task_context_menu">
        <MenuItem>Remove Item</MenuItem>
        <MenuItem onClick={() => setChecking(!checking)}>Check Item</MenuItem>
        <SubMenu title="Set Priority">
          <MenuItem>High Priority</MenuItem>
          <MenuItem>Med Priority</MenuItem>
          <MenuItem>Low Priority</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }

  return (
    <div>
      <ContextMenuTrigger id="task_context_menu">
        <div className="individual_task" style={{ display: displayed }}>
          <p className="inner_task_block" style={{ textDecoration: decorator }}>
            {props.task}
          </p>
          <div className="inner_task_checkbox">
            <div
              className="checkbox_container"
              onClick={() => setChecking(!checking)}
            >
              <div className="whitebox_cover"></div>
              <img src={checkState} className="checkbox_image" />
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      {contextMenu()}
    </div>
  );
};

export default compose(
  graphql(removeTaskMutation, { name: "removeTaskMutation" })
)(IndividualTask);
