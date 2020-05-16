import React, { useState, useEffect, useContext } from "react";
import { userQuery } from "../../../queries/queries";
import { ClearTaskList } from "./ClearTaskList";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import IndividualTask from "./IndividualTask";
import { userContext } from "../../../App";
import AddTask from "./AddTask";
import "../../../App.scss";

interface Props {
  taskQuery: () => object;
}

const Tasks: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { data, loading } = useQuery(userQuery, {
    variables: { username: userVal.username },
    pollInterval: 200
  });
  const [displayTask, setDisplayTask] = useState(true);
  const [loadIfEmpty, setLoadIfEmpty] = useState("Add a task to start...");
  const [emptyContainer, setEmptyContainer] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (data.user.tasks.length > 0) {
        setEmptyContainer(false);
      } else {
        setEmptyContainer(true);
      }
    }
  }, [data]);

  function clearTasks() {
    setDisplayTask(!displayTask);
  }

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    if (emptyContainer) {
      return (
        <div className="task_box_container">
          <div className="task_box">
            <p className="load_if_empty">{loadIfEmpty}</p>
          </div>
          <div className="task_buttons">
            <AddTask clearTasks={clearTasks} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="task_box_container">
          <div className="task_box">
            <div className="tasklist_container">
              {data.user.tasks.map((task: any) => (
                <IndividualTask
                  key={task.id}
                  userId={userVal.id}
                  id={task.id}
                  task={task.content}
                  displayTask={displayTask}
                />
              ))}
            </div>
          </div>
          <div className="task_buttons">
            <AddTask clearTasks={clearTasks} />
          </div>
        </div>
      );
    }
  }
};

export default compose(graphql(userQuery, { name: "userQuery" }))(Tasks);
