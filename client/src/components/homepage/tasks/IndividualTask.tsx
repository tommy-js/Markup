import React, { useState, useEffect } from "react";
import checked from "../../../icons/checked.png";
import unchecked from "../../../icons/unchecked.png";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { removeTaskMutation } from "../../../queries/queries";
import low_box from "../../../icons/low_box.png";
import med_box from "../../../icons/med_box.png";
import high_box from "../../../icons/high_box.png";
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
  const [priority, setPriority] = useState(low_box);
  const [checkState, setCheckState] = useState(unchecked);
  const [randomInt] = useState(Math.floor(Math.random() * 1000000));

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
      <ContextMenu id={`task_context_menu${randomInt}`}>
        <MenuItem>Remove Item</MenuItem>
        <MenuItem onClick={() => setChecking(!checking)}>Check Item</MenuItem>
        <SubMenu title="Set Priority">
          <MenuItem onClick={() => setPriority(high_box)}>
            High Priority
          </MenuItem>
          <MenuItem onClick={() => setPriority(med_box)}>Med Priority</MenuItem>
          <MenuItem onClick={() => setPriority(low_box)}>Low Priority</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }

  return (
    <div>
      <ContextMenuTrigger id={`task_context_menu${randomInt}`}>
        <div className="individual_task" style={{ display: displayed }}>
          <p className="inner_task_block" style={{ textDecoration: decorator }}>
            {props.task}
          </p>
          <div className="inner_task_checkbox">
            <img src={priority} className="checkbox_image" />
          </div>
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
